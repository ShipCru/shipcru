import { extractID } from '@/utils/extractID'

interface JobTitleFilterInput {
  jobTitleMode?: string | null
  jobTitles?: Array<{ id: number } | number> | null
  excludedJobTitles?: Array<{ id: number } | number> | null
}

export function buildJobTitleWhere(
  cfg: JobTitleFilterInput,
  visibleIndustryIds: number[],
) {
  const conditions: Record<string, unknown>[] = [
    { industries: { in: visibleIndustryIds } },
  ]

  if (cfg.jobTitleMode === 'specific' && cfg.jobTitles?.length) {
    conditions.push({ id: { in: cfg.jobTitles.map(extractID) } })
  } else if (cfg.jobTitleMode === 'exclude-specific' && cfg.excludedJobTitles?.length) {
    conditions.push({ id: { not_in: cfg.excludedJobTitles.map(extractID) } })
  }

  return conditions.length === 1 ? conditions[0] : { and: conditions }
}
