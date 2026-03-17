import { describe, expect, it } from 'vitest'

import {
  checkKeywordAccess,
  type KeywordLandingsConfig,
} from '@/lib/keyword-landings/checkKeywordAccess'

describe('checkKeywordAccess', () => {
  it('returns false when disabled', () => {
    const config: KeywordLandingsConfig = { enabled: false, mode: 'all', patterns: [] }
    expect(checkKeywordAccess('resume-builder', config)).toBe(false)
  })

  it('returns true for all mode', () => {
    const config: KeywordLandingsConfig = { enabled: true, mode: 'all', patterns: [] }
    expect(checkKeywordAccess('anything', config)).toBe(true)
  })

  describe('include mode', () => {
    it('allows matching patterns', () => {
      const config: KeywordLandingsConfig = {
        enabled: true,
        mode: 'include',
        patterns: [{ pattern: 'best-*' }],
      }
      expect(checkKeywordAccess('best-resume-builder', config)).toBe(true)
    })

    it('blocks non-matching patterns', () => {
      const config: KeywordLandingsConfig = {
        enabled: true,
        mode: 'include',
        patterns: [{ pattern: 'best-*' }],
      }
      expect(checkKeywordAccess('free-resume-builder', config)).toBe(false)
    })

    it('supports wildcard in the middle', () => {
      const config: KeywordLandingsConfig = {
        enabled: true,
        mode: 'include',
        patterns: [{ pattern: '*-resume-*' }],
      }
      expect(checkKeywordAccess('free-resume-templates', config)).toBe(true)
      expect(checkKeywordAccess('best-resume-builder', config)).toBe(true)
      expect(checkKeywordAccess('cv-builder', config)).toBe(false)
    })

    it('supports complex patterns', () => {
      const config: KeywordLandingsConfig = {
        enabled: true,
        mode: 'include',
        patterns: [{ pattern: 'free-*-templates' }],
      }
      expect(checkKeywordAccess('free-resume-templates', config)).toBe(true)
      expect(checkKeywordAccess('free-cv-creator-templates', config)).toBe(true)
      expect(checkKeywordAccess('free-resume-examples', config)).toBe(false)
    })

    it('matches multiple patterns with OR logic', () => {
      const config: KeywordLandingsConfig = {
        enabled: true,
        mode: 'include',
        patterns: [{ pattern: 'best-*' }, { pattern: '*-templates' }],
      }
      expect(checkKeywordAccess('best-cv-builder', config)).toBe(true)
      expect(checkKeywordAccess('resume-builder-templates', config)).toBe(true)
      expect(checkKeywordAccess('free-resume-builder', config)).toBe(false)
    })
  })

  describe('exclude mode', () => {
    it('blocks matching patterns', () => {
      const config: KeywordLandingsConfig = {
        enabled: true,
        mode: 'exclude',
        patterns: [{ pattern: 'free-*' }],
      }
      expect(checkKeywordAccess('free-resume-builder', config)).toBe(false)
    })

    it('allows non-matching patterns', () => {
      const config: KeywordLandingsConfig = {
        enabled: true,
        mode: 'exclude',
        patterns: [{ pattern: 'free-*' }],
      }
      expect(checkKeywordAccess('best-resume-builder', config)).toBe(true)
    })
  })

  it('handles exact match (no wildcard)', () => {
    const config: KeywordLandingsConfig = {
      enabled: true,
      mode: 'include',
      patterns: [{ pattern: 'resume-builder' }],
    }
    expect(checkKeywordAccess('resume-builder', config)).toBe(true)
    expect(checkKeywordAccess('resume-builder-templates', config)).toBe(false)
  })
})
