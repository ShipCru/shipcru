import type { ParsedResumeUrl } from './types'
import type { EntityData } from './validateEntity'
import type { Payload } from 'payload'

/**
 * Checks whether the tenant is configured to serve this page.
 * Returns false if:
 * - No tenant-page-config exists for this tenant
 * - Industry is not included (or is excluded) by the config
 * - Job title is not allowed by the jobTitleMode
 */
export async function checkTenantPageConfig(
  payload: Payload,
  tenantId: number | string,
  parsed: ParsedResumeUrl,
  entity: EntityData,
): Promise<boolean> {
  const result = await payload.find({
    collection: 'tenant-page-configs',
    where: { tenant: { equals: tenantId } },
    limit: 1,
    depth: 1,
  })

  const cfg = result.docs[0]
  if (!cfg) return false

  if (cfg.mode === 'include') {
    const industryIncluded = cfg.industries?.some(
      (ind) => (typeof ind === 'object' ? ind.id : ind) === entity.industryId,
    )
    if (!industryIncluded) return false
  } else if (cfg.mode === 'exclude') {
    const industryExcluded = cfg.industries?.some(
      (ind) => (typeof ind === 'object' ? ind.id : ind) === entity.industryId,
    )
    if (industryExcluded) return false
  }

  if (parsed.type === 'job-title') {
    if (cfg.jobTitleMode === 'specific') {
      const jtAllowed = cfg.jobTitles?.some(
        (jt) => (typeof jt === 'object' ? jt.slug : jt) === parsed.jobTitleSlug,
      )
      if (!jtAllowed) return false
    } else if (cfg.jobTitleMode === 'exclude-specific') {
      const jtExcluded = cfg.excludedJobTitles?.some(
        (jt) => (typeof jt === 'object' ? jt.slug : jt) === parsed.jobTitleSlug,
      )
      if (jtExcluded) return false
    }
  }

  return true
}
