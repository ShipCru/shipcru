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
    // adj(3) x rw(2) x builder(3) x content(3) = 54 raw
    // Minus 2 single-part slugs (resumeWord alone) = 52
    expect(combos).toHaveLength(52)
  })

  it('includes expected slugs', () => {
    const combos = generateKeywordCombinations(pools)
    expect(combos).toContain('resume-builder')
    expect(combos).toContain('free-resume-builder-templates')
    expect(combos).toContain('best-cv-maker-examples')
    expect(combos).toContain('cv-maker')
    // Builder-less slugs
    expect(combos).toContain('resume-templates')
    expect(combos).toContain('free-resume')
    expect(combos).toContain('cv-examples')
    expect(combos).toContain('best-cv')
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
