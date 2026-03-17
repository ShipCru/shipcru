import { describe, expect, it } from 'vitest'

import { generateKeywordCombinations } from '@/lib/keyword-landings/generateCombinations'

const pools = {
  resumeWords: ['resume', 'cv'],
  adjectives: ['best', 'free'],
  builders: ['builder', 'maker'],
  contentWords: ['templates', 'examples'],
}

describe('generateKeywordCombinations', () => {
  it('generates all valid combinations', () => {
    const combos = generateKeywordCombinations(pools)
    // With adjective + content: 2 adj x 2 resume x 2 builder x 2 content = 16
    // With adjective only (no content): 2 x 2 x 2 = 8
    // With content only (no adjective): 2 x 2 x 2 = 8
    // resume-builder alone (no adj, no content): 2 x 2 = 4
    // Total = 16 + 8 + 8 + 4 = 36
    expect(combos).toHaveLength(36)
  })

  it('includes expected slugs', () => {
    const combos = generateKeywordCombinations(pools)
    expect(combos).toContain('resume-builder')
    expect(combos).toContain('free-resume-builder-templates')
    expect(combos).toContain('best-cv-maker-examples')
    expect(combos).toContain('cv-maker')
  })

  it('does not include bare resume word alone', () => {
    const combos = generateKeywordCombinations(pools)
    expect(combos).not.toContain('resume')
    expect(combos).not.toContain('cv')
  })

  it('produces unique slugs', () => {
    const combos = generateKeywordCombinations(pools)
    expect(new Set(combos).size).toBe(combos.length)
  })

  it('returns empty array for empty pools', () => {
    const combos = generateKeywordCombinations({
      resumeWords: [],
      adjectives: [],
      builders: [],
      contentWords: [],
    })
    expect(combos).toEqual([])
  })
})
