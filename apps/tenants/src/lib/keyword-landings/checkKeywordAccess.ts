import { TenantPageConfig } from '@/payload-types'

export interface KeywordLandingsConfig {
  enabled: boolean
  mode: 'all' | 'include' | 'exclude'
  patterns: Array<{ pattern: string }>
}

/**
 * Converts a simple glob pattern (with * wildcards) to a RegExp.
 * `*` matches any sequence of characters (including hyphens).
 */
function globToRegex(pattern: string): RegExp {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&')
  const regexStr = '^' + escaped.replace(/\*/g, '.*') + '$'
  return new RegExp(regexStr)
}

function matchesAnyPattern(slug: string, patterns: Array<{ pattern: string }>): boolean {
  return patterns.some(({ pattern }) => globToRegex(pattern).test(slug))
}

export function checkKeywordAccess(
  slug: string,
  config: TenantPageConfig['keywordLandings'],
): boolean {
  if (!config.enabled) return false
  if (config.mode === 'all') return true
  if (config.mode === 'include') return matchesAnyPattern(slug, config.patterns)
  if (config.mode === 'exclude') return !matchesAnyPattern(slug, config.patterns)
  return false
}
