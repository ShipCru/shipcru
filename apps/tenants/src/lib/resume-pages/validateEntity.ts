import type { ParsedResumeUrl } from './types'
import type { Payload } from 'payload'

import { draftMode } from 'next/headers'

import { getEntityId } from '@/utilities/getEntityId'

function extractRelId(value: unknown): number | string | null {
  if (value === null || value === undefined) return null
  if (typeof value === 'number' || typeof value === 'string') return value
  if (typeof value === 'object' && 'id' in (value as object)) {
    return (value as { id: number | string }).id
  }
  return null
}

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
  // Canonical suffix override fields (top-level in Canonical tab, not nested in a group)
  overrideSuffix?: boolean | null
  suffixAdjective?: number | string | null
  suffixBuilder?: number | string | null
  suffixContentWord?: number | string | null
  suffixStrategy?: string | null
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
  const { isEnabled: draft } = await draftMode()

  if (parsed.type === 'industry') {
    return validateIndustryEntity(payload, parsed.industrySlug, draft)
  }

  return validateJobTitleEntity(payload, parsed.industrySlug, parsed.jobTitleSlug!, draft)
}

async function validateIndustryEntity(
  payload: Payload,
  industrySlug: string,
  draft: boolean,
): Promise<EntityData | null> {
  const result = await payload.find({
    collection: 'industries',
    where: { slug: { equals: industrySlug } },
    limit: 1,
    depth: 1,
    draft,
    overrideAccess: draft,
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
  draft: boolean,
): Promise<EntityData | null> {
  const [industryResult, jobTitleResult] = await Promise.all([
    payload.find({
      collection: 'industries',
      where: { slug: { equals: industrySlug } },
      limit: 1,
      draft,
      overrideAccess: draft,
    }),
    payload.find({
      collection: 'job-titles',
      where: { slug: { equals: jobTitleSlug } },
      limit: 1,
      depth: 1,
      draft,
      overrideAccess: draft,
    }),
  ])

  const industry = industryResult.docs[0]
  const jobTitle = jobTitleResult.docs[0]

  if (!industry || !jobTitle) return null

  const jtIndustries = jobTitle.industries ?? []
  const industryId = industry.id
  const belongs = jtIndustries.some((ind) => getEntityId(ind) === industryId)

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
    skills: [],
    meta: jobTitle.meta,
    overrideSuffix: jobTitle.overrideSuffix ?? null,
    suffixAdjective: extractRelId(jobTitle.suffixAdjective),
    suffixBuilder: extractRelId(jobTitle.suffixBuilder),
    suffixContentWord: extractRelId(jobTitle.suffixContentWord),
    suffixStrategy: jobTitle.suffixStrategy ?? null,
  }
}
