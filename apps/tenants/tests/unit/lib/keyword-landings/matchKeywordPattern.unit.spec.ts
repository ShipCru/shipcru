import { describe, expect, it } from 'vitest'

import {
  keywordPatternSpecificity,
  matchKeywordPattern,
} from '@/lib/keyword-landings/matchKeywordPattern'

describe('matchKeywordPattern', () => {
  it('matches exact slug', () => {
    expect(matchKeywordPattern('free-resume-builder', 'free-resume-builder')).toBe(true)
  })

  it('rejects non-matching exact slug', () => {
    expect(matchKeywordPattern('free-resume-builder', 'best-resume-builder')).toBe(false)
  })

  it('matches catch-all wildcard', () => {
    expect(matchKeywordPattern('*', 'free-resume-builder')).toBe(true)
    expect(matchKeywordPattern('*', 'resume-templates')).toBe(true)
  })

  it('matches prefix wildcard', () => {
    expect(matchKeywordPattern('*-resume-builder', 'free-resume-builder')).toBe(true)
    expect(matchKeywordPattern('*-resume-builder', 'best-resume-builder')).toBe(true)
    expect(matchKeywordPattern('*-resume-builder', 'free-resume-templates')).toBe(false)
  })

  it('matches suffix wildcard', () => {
    expect(matchKeywordPattern('free-resume-*', 'free-resume-builder')).toBe(true)
    expect(matchKeywordPattern('free-resume-*', 'free-resume-templates')).toBe(true)
    expect(matchKeywordPattern('free-resume-*', 'best-resume-builder')).toBe(false)
  })

  it('matches middle wildcard', () => {
    expect(matchKeywordPattern('free-*-builder', 'free-resume-builder')).toBe(true)
    expect(matchKeywordPattern('free-*-builder', 'free-cv-builder')).toBe(true)
    expect(matchKeywordPattern('free-*-builder', 'best-resume-builder')).toBe(false)
  })

  it('matches multiple wildcards', () => {
    expect(matchKeywordPattern('*-resume-*', 'free-resume-builder')).toBe(true)
    expect(matchKeywordPattern('*-resume-*', 'best-resume-templates')).toBe(true)
    expect(matchKeywordPattern('*-resume-*', 'free-cv-builder')).toBe(false)
  })

  it('is case-insensitive', () => {
    expect(matchKeywordPattern('Free-Resume-*', 'free-resume-builder')).toBe(true)
  })

  it('handles empty pattern', () => {
    expect(matchKeywordPattern('', 'free-resume-builder')).toBe(false)
  })

  it('rejects empty slug', () => {
    expect(matchKeywordPattern('*', '')).toBe(false)
    expect(matchKeywordPattern('foo', '')).toBe(false)
  })

  it('handles consecutive wildcards', () => {
    expect(matchKeywordPattern('**', 'anything')).toBe(true)
    expect(matchKeywordPattern('free-**-builder', 'free-resume-builder')).toBe(true)
  })
})

describe('keywordPatternSpecificity', () => {
  it('returns -1 for empty pattern', () => {
    expect(keywordPatternSpecificity('')).toBe(-1)
  })

  it('returns 0 for catch-all wildcard', () => {
    expect(keywordPatternSpecificity('*')).toBe(0)
  })

  it('returns 1 for patterns with wildcards', () => {
    expect(keywordPatternSpecificity('free-resume-*')).toBe(1)
    expect(keywordPatternSpecificity('*-resume-builder')).toBe(1)
    expect(keywordPatternSpecificity('*-resume-*')).toBe(1)
  })

  it('returns 2 for exact patterns (no wildcards)', () => {
    expect(keywordPatternSpecificity('free-resume-builder')).toBe(2)
  })
})
