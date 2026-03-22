import type { ParsedResumeUrl } from '@/lib/resume-pages/types'
import type { Tenant } from '@/payload-types'

import { isIndustryVisible } from './isIndustryVisible'
import { isJobTitleVisible } from './isJobTitleVisible'

interface PageEntity {
  industryId: number | string
}

export function checkPageAccess(
  cfg: Tenant | null,
  parsed: ParsedResumeUrl,
  entity: PageEntity,
): boolean {
  if (!cfg) return false

  if (!isIndustryVisible(cfg, entity.industryId as number)) return false

  if (parsed.type === 'job-title' && parsed.jobTitleSlug) {
    if (!isJobTitleVisible(cfg, parsed.jobTitleSlug)) return false
  }

  return true
}
