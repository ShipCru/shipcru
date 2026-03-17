import { describe, expect, it } from 'vitest'

import { isValidKeywordSlug, parseKeywordSlug } from '@/lib/keyword-landings/parseKeywordSlug'

const pools = {
  resumeWords: ['resume', 'cv', 'curriculum-vitae'],
  adjectives: ['best', 'free', 'professional'],
  builders: ['builder', 'creator', 'maker'],
  contentWords: ['templates', 'examples', 'samples'],
}

describe('parseKeywordSlug', () => {
  it('parses resume-builder (no adj, no content)', () => {
    expect(parseKeywordSlug('resume-builder', pools)).toEqual({
      adjective: null,
      resumeWord: 'resume',
      builder: 'builder',
      contentWord: null,
    })
  })

  it('parses free-resume-builder (adj, no content)', () => {
    expect(parseKeywordSlug('free-resume-builder', pools)).toEqual({
      adjective: 'free',
      resumeWord: 'resume',
      builder: 'builder',
      contentWord: null,
    })
  })

  it('parses resume-builder-templates (no adj, with content)', () => {
    expect(parseKeywordSlug('resume-builder-templates', pools)).toEqual({
      adjective: null,
      resumeWord: 'resume',
      builder: 'builder',
      contentWord: 'templates',
    })
  })

  it('parses full 4-part: best-cv-maker-examples', () => {
    expect(parseKeywordSlug('best-cv-maker-examples', pools)).toEqual({
      adjective: 'best',
      resumeWord: 'cv',
      builder: 'maker',
      contentWord: 'examples',
    })
  })

  it('parses multi-word resume word: professional-curriculum-vitae-creator', () => {
    expect(parseKeywordSlug('professional-curriculum-vitae-creator', pools)).toEqual({
      adjective: 'professional',
      resumeWord: 'curriculum-vitae',
      builder: 'creator',
      contentWord: null,
    })
  })

  it('returns null for invalid slug', () => {
    expect(parseKeywordSlug('invalid-slug', pools)).toBeNull()
  })

  it('returns null for empty string', () => {
    expect(parseKeywordSlug('', pools)).toBeNull()
  })

  it('returns null for bare resume word', () => {
    expect(parseKeywordSlug('resume', pools)).toBeNull()
  })
})

describe('isValidKeywordSlug', () => {
  it('returns true for valid slugs', () => {
    expect(isValidKeywordSlug('resume-builder', pools)).toBe(true)
    expect(isValidKeywordSlug('free-cv-maker-templates', pools)).toBe(true)
  })

  it('returns false for invalid slugs', () => {
    expect(isValidKeywordSlug('not-a-valid-combo', pools)).toBe(false)
    expect(isValidKeywordSlug('', pools)).toBe(false)
  })
})
