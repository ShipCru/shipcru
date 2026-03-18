import { extractID } from '@/utils/extractID'

interface IndustryVisibilityInput {
  mode?: string | null
  industries?: Array<{ id: number } | number> | null
}

export function isIndustryVisible(cfg: IndustryVisibilityInput, industryId: number): boolean {
  if (!cfg.mode || cfg.mode === 'all') return true

  const ids = cfg.industries?.map(extractID) ?? []

  if (cfg.mode === 'include') return ids.includes(industryId)
  if (cfg.mode === 'exclude') return !ids.includes(industryId)

  return true
}
