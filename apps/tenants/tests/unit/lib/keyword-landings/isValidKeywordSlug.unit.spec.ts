import type { TemplateWordPools } from '@/lib/keyword-landings/templatePatterns'

import { describe, expect, it } from 'vitest'

import { isValidKeywordSlug } from '@/lib/keyword-landings/templatePatterns'

const pools: TemplateWordPools = {
  resume: ['resume', 'cv', 'curriculum-vitae'],
  verb: ['build', 'create', 'make'],
  verber: ['builder', 'creator', 'maker'],
  adjective: ['best', 'free', 'professional'],
  contentWord: ['templates', 'examples', 'samples'],
}

describe('isValidKeywordSlug', () => {
  it('returns true for resume-builder (resume-verber pattern)', () => {
    expect(isValidKeywordSlug('resume-builder', pools)).toBe(true)
  })

  it('returns true for resume-templates (resume-contentWord pattern)', () => {
    expect(isValidKeywordSlug('resume-templates', pools)).toBe(true)
  })

  it('returns true for free-cv-maker (adjective-resume-verber pattern)', () => {
    expect(isValidKeywordSlug('free-cv-maker', pools)).toBe(true)
  })

  it('returns true for free-cv-maker-templates (adjective-resume-verber-contentWord)', () => {
    expect(isValidKeywordSlug('free-cv-maker-templates', pools)).toBe(true)
  })

  it('returns true for best-resume-examples (adjective-resume-contentWord)', () => {
    expect(isValidKeywordSlug('best-resume-examples', pools)).toBe(true)
  })

  it('returns true for multi-word resume: professional-curriculum-vitae-creator', () => {
    expect(isValidKeywordSlug('professional-curriculum-vitae-creator', pools)).toBe(true)
  })

  it('returns false for invalid slug', () => {
    expect(isValidKeywordSlug('not-a-valid-combo', pools)).toBe(false)
  })

  it('returns false for empty string', () => {
    expect(isValidKeywordSlug('', pools)).toBe(false)
  })

  it('returns false for bare resume word', () => {
    expect(isValidKeywordSlug('resume', pools)).toBe(false)
  })

  it('accepts custom patterns', () => {
    const customPatterns = ['how-to-$(verb)-a-$(resume)']
    expect(isValidKeywordSlug('how-to-build-a-resume', pools, customPatterns)).toBe(true)
    expect(isValidKeywordSlug('resume-builder', pools, customPatterns)).toBe(false)
  })
})
