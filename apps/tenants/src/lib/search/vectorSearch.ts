import type { SearchResult } from './trigramSearch'
import type { Payload } from 'payload'

import { sql } from '@payloadcms/db-postgres'

import { generateEmbedding, vectorToString } from '@/lib/embedding/generateEmbedding'

export async function vectorSearch(
  payload: Payload,
  query: string,
  options: {
    collection?: string
    locale?: string
    limit?: number
  } = {},
): Promise<SearchResult[]> {
  const { collection, locale = 'en', limit = 20 } = options
  const db = payload.db.drizzle

  const embedding = await generateEmbedding(query)
  const vectorStr = vectorToString(embedding)

  const collectionFilter =
    collection === 'job-titles'
      ? sql`AND sr."job_titles_id" IS NOT NULL`
      : collection === 'resume-content'
        ? sql`AND sr."resume_content_id" IS NOT NULL`
        : sql``

  const results = await db.execute(sql`
    SELECT
      s."id",
      sl."title",
      CASE
        WHEN sr."job_titles_id" IS NOT NULL THEN 'job-titles'
        WHEN sr."resume_content_id" IS NOT NULL THEN 'resume-content'
      END AS "collection",
      COALESCE(sr."job_titles_id", sr."resume_content_id") AS "docId",
      s."source_slug" AS "sourceSlug",
      s."industry_slug" AS "industrySlug",
      s."suffix_adjective" AS "suffixAdjective",
      s."suffix_resume_word" AS "suffixResumeWord",
      s."suffix_builder" AS "suffixBuilder",
      s."suffix_content_word" AS "suffixContentWord",
      s."content_type" AS "contentType",
      1 - (sl."embedding" <=> ${vectorStr}::vector) AS "score"
    FROM "search" s
    JOIN "search_locales" sl ON sl."_parent_id" = s."id" AND sl."_locale" = ${locale}
    JOIN "search_rels" sr ON sr."parent_id" = s."id" AND sr."path" = 'doc'
    WHERE sl."embedding" IS NOT NULL
    ${collectionFilter}
    ORDER BY sl."embedding" <=> ${vectorStr}::vector
    LIMIT ${limit}
  `)

  return results.rows as unknown as SearchResult[]
}
