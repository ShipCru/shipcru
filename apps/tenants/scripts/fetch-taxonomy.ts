/**
 * Standalone script to fetch taxonomy data from Rocket Resume's GraphQL endpoint
 * and save it as JSON files for seeding a local database.
 *
 * Usage: npx tsx scripts/fetch-taxonomy.ts
 *
 * No dependencies on the glass repo — uses only native fetch.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const TAXONOMY_URL = "https://taxonomy.rocket-resume.dev/";
const OUTPUT_DIR = join(import.meta.dirname, "taxonomy-data");
// Set to true to skip steps you've already completed
const SKIP_INDUSTRIES = true;
const SKIP_JOB_TITLES = true;
const SKIP_CONTENT = true;
const SKIP_RELATIONS = true;
const SKIP_SOURCES = true; // CategorySource excluded from GraphQL schema — not queryable

const CONTENT_LIMIT = 100; // per type
const PAGE_SIZE = 200; // for paginated fetches (industries, job titles)

const CONTENT_TYPES = [
  "SKILL",
  "EXPERIENCE",
  "SUMMARY",
  "ACCOMPLISHMENT",
  "AFFILIATION",
  "CERTIFICATION",
] as const;

// ─── GraphQL helper ──────────────────────────────────────────────────────────

async function gql<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(TAXONOMY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as { data?: T; errors?: Array<{ message: string }> };

  if (json.errors?.length) {
    throw new Error(`GraphQL errors: ${json.errors.map((e) => e.message).join(", ")}`);
  }

  return json.data!;
}

// ─── Paginated fetcher ───────────────────────────────────────────────────────

async function paginate<T>(
  label: string,
  fetchPage: (take: number, skip: number) => Promise<T[]>,
): Promise<T[]> {
  const all: T[] = [];
  let skip = 0;

  while (true) {
    console.log(`  ${label} ${skip}–${skip + PAGE_SIZE}...`);
    const batch = await fetchPage(PAGE_SIZE, skip);
    all.push(...batch);
    if (batch.length < PAGE_SIZE) break;
    skip += PAGE_SIZE;
  }

  return all;
}

// ─── Queries ─────────────────────────────────────────────────────────────────

async function fetchIndustriesPage(take: number, skip: number) {
  type Result = {
    findManyCategory: Array<{ id: string; name: string; slug: string }>;
  };

  const data = await gql<Result>(
    `query ($where: CategoryWhereInput, $orderBy: [CategoryOrderByWithRelationInput!], $take: Int, $skip: Int) {
      findManyCategory(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
        id
        name
        slug
      }
    }`,
    {
      where: { type: { equals: "INDUSTRY" }, status: { equals: "PUBLISHED" } },
      orderBy: [{ name: "asc" }],
      take,
      skip,
    },
  );

  return data.findManyCategory;
}

async function fetchJobTitlesPage(take: number, skip: number) {
  type Result = {
    findManyCategory: Array<{
      id: string;
      name: string;
      slug: string;
      parentCategories: Array<{ id: string; slug: string; name: string }>;
    }>;
  };

  const data = await gql<Result>(
    `query ($where: CategoryWhereInput, $orderBy: [CategoryOrderByWithRelationInput!], $take: Int, $skip: Int) {
      findManyCategory(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
        id
        name
        slug
        parentCategories(
          where: { type: { equals: INDUSTRY }, status: { equals: PUBLISHED } }
          orderBy: { slug: asc }
        ) {
          id
          slug
          name
        }
      }
    }`,
    {
      where: { type: { equals: "JOBTITLE" }, status: { equals: "PUBLISHED" } },
      orderBy: [{ name: "asc" }],
      take,
      skip,
    },
  );

  return data.findManyCategory;
}

async function fetchContent(contentType: (typeof CONTENT_TYPES)[number], take: number) {
  type Result = {
    findManyContent: Array<{ id: string; text: string; slug: string }>;
  };

  const data = await gql<Result>(
    `query ($where: ContentWhereInput, $orderBy: [ContentOrderByWithRelationInput!], $take: Int) {
      findManyContent(where: $where, orderBy: $orderBy, take: $take) {
        id
        text
        slug
      }
    }`,
    {
      where: { type: { equals: contentType }, status: { equals: "PUBLISHED" } },
      orderBy: [{ slug: "asc" }],
      take,
    },
  );

  return data.findManyContent;
}

async function fetchRelationsForContentIds(contentIds: string[]) {
  type Result = {
    findManyCategoryContent: Array<{
      categoryId: string;
      contentId: string;
    }>;
  };

  const data = await gql<Result>(
    `query ($where: CategoryContentWhereInput, $take: Int) {
      findManyCategoryContent(where: $where, take: $take) {
        categoryId
        contentId
      }
    }`,
    {
      where: { contentId: { in: contentIds } },
      take: contentIds.length * 10, // a content item can belong to multiple categories
    },
  );

  return data.findManyCategoryContent;
}

async function fetchAllSources() {
  type Result = {
    findManySource: Array<{ id: string; text: string; slug: string }>;
  };

  const data = await gql<Result>(
    `query ($take: Int) {
      findManySource(take: $take) {
        id
        text
        slug
      }
    }`,
    { take: 100 },
  );

  return data.findManySource;
}

async function fetchCategorySourcesPage(take: number, skip: number) {
  type Result = {
    findManyCategorySource: Array<{
      categoryId: string;
      sourceId: string;
    }>;
  };

  const data = await gql<Result>(
    `query ($take: Int, $skip: Int) {
      findManyCategorySource(take: $take, skip: $skip) {
        categoryId
        sourceId
      }
    }`,
    { take, skip },
  );

  return data.findManyCategorySource;
}

// ─── Main ────────────────────────────────────────────────────────────────────

function writeJson(filename: string, data: unknown) {
  const path = join(OUTPUT_DIR, filename);
  writeFileSync(path, JSON.stringify(data, null, 2));
  console.log(`  wrote ${filename}`);
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // 1. Industries
  if (SKIP_INDUSTRIES) {
    console.log("Skipping industries\n");
  } else {
    console.log("Fetching industries...");
    const industries = await paginate("industries", fetchIndustriesPage);
    writeJson("industries.json", industries);
    console.log(`  ${industries.length} industries\n`);
  }

  // 2. Job titles
  if (SKIP_JOB_TITLES) {
    console.log("Skipping job titles\n");
  } else {
    console.log("Fetching job titles...");
    const jobTitles = await paginate("job-titles", fetchJobTitlesPage);
    writeJson("job-titles.json", jobTitles);
    console.log(`  ${jobTitles.length} job titles\n`);
  }

  // 3. Content (100 per type) + their relations
  const allContentIds: string[] = [];

  if (SKIP_CONTENT) {
    console.log("Skipping content\n");
  } else {
    for (const ct of CONTENT_TYPES) {
      console.log(`Fetching ${ct} (${CONTENT_LIMIT})...`);
      const content = await fetchContent(ct, CONTENT_LIMIT);
      allContentIds.push(...content.map((c) => c.id));
      writeJson(`content-${ct.toLowerCase()}.json`, content);
      console.log(`  ${content.length} entries\n`);
    }
  }

  // 4. Relations only for the content we fetched
  if (SKIP_RELATIONS) {
    console.log("Skipping relations\n");
  } else if (allContentIds.length === 0) {
    console.log("No content IDs to fetch relations for (enable content step or set SKIP_RELATIONS=true)\n");
  } else {
    console.log(`Fetching relations for ${allContentIds.length} content items...`);
    const relations = await fetchRelationsForContentIds(allContentIds);
    writeJson("category-content-relations.json", relations);
    console.log(`  ${relations.length} relations\n`);
  }

  // 5. Sources (the list + which categories they're linked to)
  if (SKIP_SOURCES) {
    console.log("Skipping sources\n");
  } else {
    console.log("Fetching sources...");
    const sources = await fetchAllSources();
    writeJson("sources.json", sources);
    console.log(`  ${sources.length} sources\n`);

    console.log("Fetching category↔source relations...");
    const categorySources = await paginate("category-sources", fetchCategorySourcesPage);
    writeJson("category-source-relations.json", categorySources);
    console.log(`  ${categorySources.length} relations\n`);
  }

  // 6. Manifest
  writeJson("manifest.json", {
    fetchedAt: new Date().toISOString(),
    source: TAXONOMY_URL,
  });

  console.log("Done! Files written to:", OUTPUT_DIR);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
