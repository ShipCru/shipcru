export interface KeywordWordPools {
  resumeWords: string[]
  adjectives: string[]
  builders: string[]
  contentWords: string[]
}

/**
 * Generates all valid keyword landing URL slugs from word pools.
 *
 * Format: [adjective?]-[resumeWord]-[builder?]-[contentWord?]
 * Rules:
 * - Resume word is always present
 * - Adjective, builder, and content word are optional
 * - At least 2 parts required (resumeWord alone is too generic)
 */
export function generateKeywordCombinations(pools: KeywordWordPools): string[] {
  const { resumeWords, adjectives, builders, contentWords } = pools
  if (resumeWords.length === 0) return []

  const slugs: string[] = []
  const adjectiveOptions = ['', ...adjectives]
  const builderOptions = ['', ...builders]
  const contentOptions = ['', ...contentWords]

  for (const adj of adjectiveOptions) {
    for (const rw of resumeWords) {
      for (const builder of builderOptions) {
        for (const cw of contentOptions) {
          const parts = [adj, rw, builder, cw].filter(Boolean)
          // Require at least 2 parts (resumeWord alone is too generic)
          if (parts.length < 2) continue
          slugs.push(parts.join('-'))
        }
      }
    }
  }

  return slugs
}
