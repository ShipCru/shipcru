import type { ParsedResumeUrl } from './types'
import type { Payload } from 'payload'

export interface EntityData {
  id: number | string
  industryId: number | string
  industryName: string
  categoryId: number | string | null
  jobTitleName?: string
  jobTitleSlug?: string
  skills: string[]
  meta?: {
    title?: string | null
    description?: string | null
    image?: unknown
    robots?: string | null
  }
}

/**
 * Validates that the entity (industry or job title) from the parsed URL
 * exists in D1. For job-title pages, also verifies the job title belongs
 * to the specified industry.
 *
 * Returns structured entity data or null if invalid.
 */
export async function validateEntity(
  payload: Payload,
  parsed: ParsedResumeUrl,
): Promise<EntityData | null> {
  if (parsed.type === 'industry') {
    return validateIndustryEntity(payload, parsed.industrySlug)
  }

  return validateJobTitleEntity(payload, parsed.industrySlug, parsed.jobTitleSlug!)
}

async function validateIndustryEntity(
  payload: Payload,
  industrySlug: string,
): Promise<EntityData | null> {
  const result = await payload.find({
    collection: 'industries',
    where: { slug: { equals: industrySlug } },
    limit: 1,
    depth: 1,
  })

  const industry = result.docs[0]
  if (!industry) return null

  return {
    id: industry.id,
    industryId: industry.id,
    industryName: industry.name,
    categoryId:
      typeof industry.category === 'object'
        ? (industry.category?.id ?? null)
        : (industry.category ?? null),
    skills: [],
    meta: industry.meta,
  }
}

async function validateJobTitleEntity(
  payload: Payload,
  industrySlug: string,
  jobTitleSlug: string,
): Promise<EntityData | null> {
  const [industryResult, jobTitleResult] = await Promise.all([
    payload.find({
      collection: 'industries',
      where: { slug: { equals: industrySlug } },
      limit: 1,
    }),
    payload.find({
      collection: 'job-titles',
      where: { slug: { equals: jobTitleSlug } },
      limit: 1,
      depth: 1,
    }),
  ])

  const industry = industryResult.docs[0]
  const jobTitle = jobTitleResult.docs[0]

  if (!industry || !jobTitle) return null

  const jtIndustries = jobTitle.industries as Array<{ id: number | string } | number | string>
  const industryId = industry.id
  const belongs = jtIndustries?.some(
    (ind) => (typeof ind === 'object' ? ind.id : ind) === industryId,
  )

  if (!belongs) return null

  return {
    id: jobTitle.id,
    industryId: industry.id,
    industryName: industry.name,
    categoryId:
      typeof industry.category === 'object'
        ? (industry.category?.id ?? null)
        : (industry.category ?? null),
    jobTitleName: jobTitle.name,
    jobTitleSlug: jobTitle.slug,
    skills:
      (jobTitle.suggestedSkills as Array<{ name: string } | string>)?.map((s) =>
        typeof s === 'object' ? s.name : s,
      ) ?? [],
    meta: jobTitle.meta,
  }
}
