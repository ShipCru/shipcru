/**
 * Seeds taxonomy data from JSON files into Payload CMS collections.
 *
 * Usage: npx tsx scripts/seed-taxonomy.ts
 *
 * Reads JSON files from scripts/taxonomy-data/ (produced by fetch-taxonomy.ts)
 * and creates records in: sources, industries, resume-content, job-titles.
 *
 * Idempotent — skips records that already exist (matched by name).
 */

import 'dotenv/config'

import type { Payload } from 'payload'

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { getPayload } from 'payload'

import config from '../src/payload.config'

type CmsId = number | string

// Payload's strict generated types require exact shapes; seed data is well-known,
// so we bypass with a narrow helper (same pattern as WordFormSets seed endpoint).

const create = (p: Payload, collection: string, data: Record<string, unknown>) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p.create({ collection: collection as any, data: data as any }) as Promise<{ id: CmsId }>

const update = (p: Payload, collection: string, id: CmsId, data: Record<string, unknown>) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p.update({ collection: collection as any, id: id as any, data: data as any })

const DATA_DIR = join(import.meta.dirname, 'taxonomy-data')
const CHUNK_SIZE = 20

// --- Source JSON shapes ---

interface SourceIndustry {
  id: string
  name: string
  slug: string
}

interface SourceJobTitle {
  id: string
  name: string
  slug: string
  parentCategories: Array<{ id: string; slug: string; name: string }>
}

interface SourceContent {
  id: string
  text: string
  slug: string
}

interface SourceRelation {
  categoryId: string
  contentId: string
}

// --- Helpers ---

function readJson<T>(filename: string): T {
  return JSON.parse(readFileSync(join(DATA_DIR, filename), 'utf-8'))
}

const failures: Array<{ item: unknown; error: string }> = []

async function chunked<T, R>(items: T[], size: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = []
  for (let i = 0; i < items.length; i += size) {
    const settled = await Promise.allSettled(items.slice(i, i + size).map(fn))
    for (let j = 0; j < settled.length; j++) {
      const r = settled[j]
      if (r.status === 'fulfilled') {
        results.push(r.value)
      } else {
        const item = items[i + j]
        const msg = r.reason instanceof Error ? r.reason.message : String(r.reason)
        failures.push({ item, error: msg })
      }
    }
    if (items.length > size) {
      process.stdout.write(`\r  ${Math.min(i + size, items.length)}/${items.length}`)
    }
  }
  if (items.length > size) process.stdout.write('\n')
  return results
}

// --- Main ---

async function main() {
  console.log('Bootstrapping Payload...')
  const payload = await getPayload({ config })

  // 1. Create or find the data source
  console.log('\n--- Step 1: Source ---')
  const sourceName = 'Rocket Resume Taxonomy'
  const existingSource = (
    await payload.find({
      collection: 'sources',
      where: { name: { equals: sourceName } },
      limit: 1,
      depth: 0,
    })
  ).docs[0]

  let sourceId: CmsId
  if (!existingSource) {
    const created = await create(payload, 'sources', {
      name: sourceName,
      description: 'Taxonomy data from taxonomy.rocket-resume.dev',
    })
    sourceId = created.id
    console.log(`  Created source "${sourceName}" (${sourceId})`)
  } else {
    sourceId = existingSource.id
    console.log(`  Source already exists (${sourceId})`)
  }

  const originBase = {
    source: sourceId,
    importedAt: new Date().toISOString(),
  }

  // 2. Seed Industries
  console.log('\n--- Step 2: Industries ---')
  const sourceIndustries = readJson<SourceIndustry[]>('industries.json')

  const existingIndustries = await payload.find({
    collection: 'industries',
    pagination: false,
    select: { name: true },
    depth: 0,
  })
  const existingIndustryByName = new Map(existingIndustries.docs.map((d) => [d.name, d.id]))

  const newIndustries = sourceIndustries.filter((i) => !existingIndustryByName.has(i.name))
  console.log(`  ${existingIndustryByName.size} existing, ${newIndustries.length} to create`)

  const createdIndustries = await chunked(newIndustries, CHUNK_SIZE, async (ind) => {
    const doc = await create(payload, 'industries', {
      name: ind.name,
      origin: { ...originBase, notes: `source-id:${ind.id}` },
    })
    return { sourceId: ind.id, cmsId: doc.id }
  })

  // Build industry lookup: sourceId → cmsId
  const industryMap = new Map<string, CmsId>()
  for (const ci of createdIndustries) {
    industryMap.set(ci.sourceId, ci.cmsId)
  }
  for (const si of sourceIndustries) {
    if (!industryMap.has(si.id)) {
      const cmsId = existingIndustryByName.get(si.name)
      if (cmsId) industryMap.set(si.id, cmsId)
    }
  }
  console.log(`  Mapped ${industryMap.size} source → CMS industry IDs`)

  // 3. Seed ResumeContent
  console.log('\n--- Step 3: Resume Content ---')
  const contentTypes = [
    'skill',
    'experience',
    'summary',
    'accomplishment',
    'affiliation',
    'certification',
  ] as const

  const existingContent = await payload.find({
    collection: 'resume-content',
    pagination: false,
    select: { name: true, type: true },
    depth: 0,
  })
  const existingContentByKey = new Map(
    existingContent.docs.map((d) => [`${d.type}:${d.name}`, d.id]),
  )

  const contentMap = new Map<string, CmsId>()
  let totalContentCreated = 0

  for (const ct of contentTypes) {
    const items = readJson<SourceContent[]>(`content-${ct}.json`)
    const newItems = items.filter((i) => !existingContentByKey.has(`${ct}:${i.text}`))

    console.log(`  ${ct}: ${items.length} total, ${newItems.length} new`)

    const created = await chunked(newItems, CHUNK_SIZE, async (item) => {
      const doc = await create(payload, 'resume-content', {
        type: ct,
        name: item.text,
        origin: { ...originBase, notes: `source-id:${item.id}` },
      })
      return { sourceId: item.id, cmsId: doc.id }
    })

    for (const c of created) contentMap.set(c.sourceId, c.cmsId)
    totalContentCreated += created.length

    // Map pre-existing
    for (const item of items) {
      if (!contentMap.has(item.id)) {
        const cmsId = existingContentByKey.get(`${ct}:${item.text}`)
        if (cmsId) contentMap.set(item.id, cmsId)
      }
    }
  }

  console.log(`  Mapped ${contentMap.size} content IDs (${totalContentCreated} created)`)

  // 4. Seed JobTitles
  console.log('\n--- Step 4: Job Titles ---')
  const sourceJobTitles = readJson<SourceJobTitle[]>('job-titles.json')

  const existingJobTitles = await payload.find({
    collection: 'job-titles',
    pagination: false,
    select: { name: true },
    depth: 0,
  })
  const existingJtByName = new Map(existingJobTitles.docs.map((d) => [d.name, d.id]))

  const newJobTitles = sourceJobTitles.filter((jt) => !existingJtByName.has(jt.name))
  console.log(`  ${existingJtByName.size} existing, ${newJobTitles.length} to create`)

  const newlyCreatedJtIds = new Set<CmsId>()

  const createdJobTitles = await chunked(newJobTitles, CHUNK_SIZE, async (jt) => {
    const industryIds = jt.parentCategories
      .map((pc) => industryMap.get(pc.id))
      .filter(Boolean) as CmsId[]

    const doc = await create(payload, 'job-titles', {
      name: jt.name,
      industries: industryIds.length > 0 ? industryIds : undefined,
      origin: { ...originBase, notes: `source-id:${jt.id}` },
    })
    return { sourceId: jt.id, cmsId: doc.id }
  })

  // Build job title lookup
  const jobTitleMap = new Map<string, CmsId>()
  for (const cjt of createdJobTitles) {
    jobTitleMap.set(cjt.sourceId, cjt.cmsId)
    newlyCreatedJtIds.add(cjt.cmsId)
  }
  for (const sjt of sourceJobTitles) {
    if (!jobTitleMap.has(sjt.id)) {
      const cmsId = existingJtByName.get(sjt.name)
      if (cmsId) jobTitleMap.set(sjt.id, cmsId)
    }
  }
  console.log(`  Mapped ${jobTitleMap.size} job title IDs (${createdJobTitles.length} created)`)

  // 5. Attach suggestedContent to newly created job titles
  console.log('\n--- Step 5: Suggested Content Relations ---')
  const relations = readJson<SourceRelation[]>('category-content-relations.json')

  // Group relations by job-title categoryId (only for newly created job titles)
  const relsByJt = new Map<string, string[]>()
  let skippedNotJt = 0
  let skippedNoContent = 0
  let skippedPreExisting = 0

  for (const rel of relations) {
    const cmsJtId = jobTitleMap.get(rel.categoryId)
    if (!cmsJtId) {
      skippedNotJt++
      continue
    }
    if (!newlyCreatedJtIds.has(cmsJtId)) {
      skippedPreExisting++
      continue
    }
    if (!contentMap.has(rel.contentId)) {
      skippedNoContent++
      continue
    }

    const arr = relsByJt.get(rel.categoryId) || []
    arr.push(rel.contentId)
    relsByJt.set(rel.categoryId, arr)
  }

  console.log(`  ${relsByJt.size} newly created job titles to update`)
  console.log(
    `  Skipped: ${skippedNotJt} non-job-title, ${skippedPreExisting} pre-existing, ${skippedNoContent} missing content`,
  )

  const jtEntries = [...relsByJt.entries()]
  let updatedCount = 0

  await chunked(jtEntries, CHUNK_SIZE, async ([sourceJtId, sourceContentIds]) => {
    const cmsJtId = jobTitleMap.get(sourceJtId)!
    const suggestedContent = sourceContentIds
      .map((scId) => contentMap.get(scId))
      .filter(Boolean)
      .map((cmsContentId) => ({
        content: cmsContentId,
        experienceScore: 0,
        interestScore: 0,
      }))

    if (suggestedContent.length === 0) return

    await update(payload, 'job-titles', cmsJtId, { suggestedContent })
    updatedCount++
  })

  console.log(`  Updated ${updatedCount} job titles`)

  // Summary
  console.log('\n=== Seed complete ===')
  console.log(`  Industries:      ${createdIndustries.length} created`)
  console.log(`  Resume content:  ${totalContentCreated} created`)
  console.log(`  Job titles:      ${createdJobTitles.length} created`)
  console.log(`  Relations:       ${updatedCount} job titles got suggestedContent`)

  if (failures.length > 0) {
    console.log(`\n=== ${failures.length} failures ===`)
    for (const f of failures) {
      console.log(`  ${JSON.stringify(f.item)} — ${f.error}`)
    }
  }

  process.exit(failures.length > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
