import { extractID } from '@/utils/extractID'

interface IndustryFilterInput {
  mode?: string | null
  industries?: Array<{ id: number } | number> | null
}

export function buildIndustryWhere(cfg: IndustryFilterInput) {
  const ids = cfg.industries?.length ? cfg.industries.map(extractID) : []

  if (cfg.mode === 'include' && ids.length) {
    return { id: { in: ids } }
  }
  if (cfg.mode === 'exclude' && ids.length) {
    return { id: { not_in: ids } }
  }
  return {}
}
