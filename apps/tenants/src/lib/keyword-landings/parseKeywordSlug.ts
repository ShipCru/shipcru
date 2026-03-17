import type { KeywordWordPools } from './generateCombinations'

export interface ParsedKeywordSlug {
  adjective: string | null
  resumeWord: string
  builder: string
  contentWord: string | null
}

/**
 * Parses a keyword landing slug into its constituent parts.
 * Format: [adjective?]-[resumeWord]-[builder]-[contentWord?]
 *
 * Strategy: try each resume word as an anchor, then validate
 * the segments before it (adjective) and after it (builder, contentWord).
 */
export function parseKeywordSlug(
  slug: string,
  pools: KeywordWordPools,
): ParsedKeywordSlug | null {
  if (!slug) return null

  // Sort resume words by length descending so multi-word matches are tried first
  const sortedResumeWords = [...pools.resumeWords].sort((a, b) => b.length - a.length)

  for (const rw of sortedResumeWords) {
    // Find where the resume word appears in the slug
    const rwIndex = slug.indexOf(rw)
    if (rwIndex === -1) continue

    const before = slug.slice(0, rwIndex).replace(/-$/, '') // strip trailing hyphen
    const after = slug.slice(rwIndex + rw.length).replace(/^-/, '') // strip leading hyphen

    // Validate "before" is empty or a valid adjective
    const adjective = before === '' ? null : pools.adjectives.includes(before) ? before : undefined
    if (adjective === undefined) continue

    // Parse "after" as builder[-contentWord]
    if (after === '') continue // need at least a builder

    // Try content word from the end (right-to-left)
    let builder: string | null = null
    let contentWord: string | null = null

    // Try with content word
    for (const cw of pools.contentWords) {
      if (after.endsWith(cw)) {
        const remaining = after.slice(0, -(cw.length)).replace(/-$/, '')
        if (pools.builders.includes(remaining)) {
          builder = remaining
          contentWord = cw
          break
        }
      }
    }

    // Try without content word
    if (!builder && pools.builders.includes(after)) {
      builder = after
      contentWord = null
    }

    if (builder) {
      return { adjective, resumeWord: rw, builder, contentWord }
    }
  }

  return null
}

export function isValidKeywordSlug(slug: string, pools: KeywordWordPools): boolean {
  return parseKeywordSlug(slug, pools) !== null
}
