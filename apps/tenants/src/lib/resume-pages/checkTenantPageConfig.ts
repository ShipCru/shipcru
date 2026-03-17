import type { ParsedResumeUrl } from './types'
import type { EntityData } from './validateEntity'
import type { TenantPageConfig } from '@/payload-types'

/**
 * Checks whether the tenant page config allows serving this page.
 * Returns false if:
 * - Config is null (no config for tenant)
 * - Industry is not included (or is excluded) by the config
 * - Job title is not allowed by the jobTitleMode
 */
export function checkTenantPageConfig(
  cfg: TenantPageConfig | null,
  parsed: ParsedResumeUrl,
  entity: EntityData,
): boolean {
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
