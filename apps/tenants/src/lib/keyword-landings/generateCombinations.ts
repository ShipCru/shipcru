export interface KeywordWordPools {
  resumeWords: string[]
  adjectives: string[]
  builders: string[]
  contentWords: string[]
}

/**
 * Generates all valid keyword landing URL slugs from word pools.
 *
 * Format: [adjective?]-[resumeWord]-[builder]-[contentWord?]
 * Rules:
 * - Resume word and builder word are always present
 * - Adjective and content word are optional
 */
export function generateKeywordCombinations(pools: KeywordWordPools): string[] {
  const { resumeWords, adjectives, builders, contentWords } = pools
  if (resumeWords.length === 0 || builders.length === 0) return []

  const slugs: string[] = []
  const adjectiveOptions = ['', ...adjectives]
  const contentOptions = ['', ...contentWords]

  for (const adj of adjectiveOptions) {
    for (const rw of resumeWords) {
      for (const builder of builders) {
        for (const cw of contentOptions) {
          const parts = [adj, rw, builder, cw].filter(Boolean)
          slugs.push(parts.join('-'))
        }
      }
    }
  }

  return slugs
}
