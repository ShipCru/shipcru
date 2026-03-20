import type { TemplateWordPools } from '@/lib/keyword-landings/templatePatterns'

import { describe, expect, it } from 'vitest'

import { generateTemplateCombinations } from '@/lib/keyword-landings/generateCombinations'

const allWords: TemplateWordPools = {
  resume: ['resume', 'cv'],
  verb: ['build', 'make'],
  verber: ['builder', 'maker'],
  adjective: ['free', 'best'],
  contentWord: ['templates', 'examples'],
}

describe('generateTemplateCombinations', () => {
  it('generates combinations for a single template', () => {
    const combos = generateTemplateCombinations(['$(resume)-$(verber)'], allWords)
    expect(combos).toContain('resume-builder')
    expect(combos).toContain('resume-maker')
    expect(combos).toContain('cv-builder')
    expect(combos).toContain('cv-maker')
    expect(combos).toHaveLength(4)
  })

  it('generates combinations with literals', () => {
    const combos = generateTemplateCombinations(['how-to-$(verb)-a-$(resume)'], allWords)
    expect(combos).toContain('how-to-build-a-resume')
    expect(combos).toContain('how-to-make-a-cv')
    expect(combos).toHaveLength(4)
  })

  it('generates union across multiple templates', () => {
    const combos = generateTemplateCombinations(
      ['$(resume)-$(verber)', '$(resume)-$(contentWord)'],
      allWords,
    )
    expect(combos).toContain('resume-builder')
    expect(combos).toContain('resume-templates')
    expect(combos).toContain('cv-examples')
    expect(combos).toHaveLength(8)
  })

  it('deduplicates if templates produce the same slug', () => {
    const combos = generateTemplateCombinations(
      ['$(resume)-$(verber)', '$(resume)-$(verber)'],
      allWords,
    )
    expect(new Set(combos).size).toBe(combos.length)
  })

  it('handles empty patterns array', () => {
    expect(generateTemplateCombinations([], allWords)).toEqual([])
  })

  it('handles empty word pools', () => {
    const empty: TemplateWordPools = {
      resume: [],
      verb: [],
      verber: [],
      adjective: [],
      contentWord: [],
    }
    const combos = generateTemplateCombinations(['$(resume)-$(verber)'], empty)
    expect(combos).toEqual([])
  })

  it('generates 4-variable combinations correctly', () => {
    const combos = generateTemplateCombinations(
      ['$(adjective)-$(resume)-$(verber)-$(contentWord)'],
      allWords,
    )
    expect(combos).toContain('free-resume-builder-templates')
    expect(combos).toContain('best-cv-maker-examples')
    expect(combos).toHaveLength(16)
  })
})
