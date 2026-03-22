import { extractID } from '@/utils/extractID'

interface IndustryVisibilityInput {
  industryMode?: string | null
  industries?: Array<{ id: number } | number> | null
}

export function isIndustryVisible(cfg: IndustryVisibilityInput, industryId: number): boolean {
  if (!cfg.industryMode || cfg.industryMode === 'all') return true

  const ids = cfg.industries?.map(extractID) ?? []

  if (cfg.industryMode === 'include') return ids.includes(industryId)
  if (cfg.industryMode === 'exclude') return !ids.includes(industryId)

  return true
}
