import type { KeywordWordPools } from './generateCombinations'

export interface ParsedKeywordSlug {
  adjective: string | null
  resumeWord: string
  builder: string | null
  contentWord: string | null
}

/**
 * Parses a keyword landing slug into its constituent parts.
 * Format: [adjective?]-[resumeWord]-[builder?]-[contentWord?]
 *
 * Strategy: try each resume word as an anchor, then validate
 * the segments before it (adjective) and after it (builder, contentWord).
 * At least 2 total segments are required (resumeWord alone is too generic).
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

    let builder: string | null = null
    let contentWord: string | null = null

    if (after === '') {
      // Just [adjective?]-[resumeWord] — need adjective for 2-segment minimum
      if (!adjective) continue
    } else {
      // Try builder + content word (right-to-left)
      for (const cw of pools.contentWords) {
        if (after.endsWith(cw)) {
          const remaining = after.slice(0, -(cw.length)).replace(/-$/, '')
          if (remaining === '') {
            // Content word only, no builder
            contentWord = cw
            break
          }
          if (pools.builders.includes(remaining)) {
            builder = remaining
            contentWord = cw
            break
          }
        }
      }

      // Try builder only (no content word)
      if (!builder && !contentWord && pools.builders.includes(after)) {
        builder = after
      }

      // If after is non-empty but matched nothing, invalid
      if (!builder && !contentWord) continue
    }

    return { adjective, resumeWord: rw, builder, contentWord }
  }

  return null
}

export function isValidKeywordSlug(slug: string, pools: KeywordWordPools): boolean {
  return parseKeywordSlug(slug, pools) !== null
}
