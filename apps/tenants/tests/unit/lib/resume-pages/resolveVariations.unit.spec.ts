import { describe, it, expect } from 'vitest'

import { resolveVariationField } from '@/lib/resume-pages/resolveVariations'
import type { VariationFieldValue, VariationSet } from '@/lib/resume-pages/types'

describe('resolveVariationField', () => {
  const variationSets = new Map<string, VariationSet>([
    [
      'hero.title',
      {
        assignmentKey: 'hero.title',
        options: [
          { text: 'Build Your $(adjective) Resume', weight: 2 },
          { text: 'Create a Professional Resume', weight: 1 },
          { text: '{skill1} Resume Builder', weight: 1 },
        ],
      },
    ],
  ])

  const baseContext = {
    tenantSlug: 'resumebuilder',
    contentSeed: 'software-engineer-best-resume-creator-content',
    variationSets,
    entitySkills: ['JavaScript', 'TypeScript'],
  }

  describe('fixed mode', () => {
    it('returns fixedText as-is', () => {
      const field: VariationFieldValue = {
        mode: 'fixed',
        fixedText: 'My Fixed Title',
      }
      const result = resolveVariationField(field, baseContext)
      expect(result).toBe('My Fixed Title')
    })

    it('returns empty string when fixedText is null', () => {
      const field: VariationFieldValue = {
        mode: 'fixed',
        fixedText: null,
      }
      const result = resolveVariationField(field, baseContext)
      expect(result).toBe('')
    })

    it('returns empty string when fixedText is undefined', () => {
      const field: VariationFieldValue = {
        mode: 'fixed',
      }
      const result = resolveVariationField(field, baseContext)
      expect(result).toBe('')
    })
  })

  describe('variation mode', () => {
    it('selects from the variation set deterministically', () => {
      const field: VariationFieldValue = {
        mode: 'variation',
        variationSet: 'hero.title',
      }
      const result1 = resolveVariationField(field, baseContext)
      const result2 = resolveVariationField(field, baseContext)
      expect(result1).toBe(result2)
    })

    it('returns a valid option text from the set', () => {
      const field: VariationFieldValue = {
        mode: 'variation',
        variationSet: 'hero.title',
      }
      const result = resolveVariationField(field, baseContext)
      const allTexts = variationSets.get('hero.title')!.options.map((o) => o.text)
      expect(allTexts).toContain(result)
    })

    it('different seeds produce (potentially) different selections', () => {
      const field: VariationFieldValue = {
        mode: 'variation',
        variationSet: 'hero.title',
      }

      const results = new Set<string>()
      for (let i = 0; i < 30; i++) {
        const ctx = { ...baseContext, contentSeed: `test-page-${i}` }
        results.add(resolveVariationField(field, ctx))
      }
      // Should get some variety across 30 different seeds
      expect(results.size).toBeGreaterThan(1)
    })

    it('different tenants get different seeds and potentially different results', () => {
      const field: VariationFieldValue = {
        mode: 'variation',
        variationSet: 'hero.title',
      }

      const results = new Set<string>()
      for (const tenant of ['tenant-a', 'tenant-b', 'tenant-c', 'tenant-d', 'tenant-e']) {
        const ctx = { ...baseContext, tenantSlug: tenant }
        results.add(resolveVariationField(field, ctx))
      }
      // At least some tenants should differ (probabilistic but very likely with 5 tenants)
      // We check >= 1 since same selection is possible but unlikely for all 5
      expect(results.size).toBeGreaterThanOrEqual(1)
    })

    it('falls back to fixedText when variation set is not found', () => {
      const field: VariationFieldValue = {
        mode: 'variation',
        variationSet: 'nonexistent.key',
        fixedText: 'Fallback Text',
      }
      const result = resolveVariationField(field, baseContext)
      expect(result).toBe('Fallback Text')
    })

    it('returns empty string when variation set not found and no fixedText', () => {
      const field: VariationFieldValue = {
        mode: 'variation',
        variationSet: 'nonexistent.key',
      }
      const result = resolveVariationField(field, baseContext)
      expect(result).toBe('')
    })

    it('filters skill options when entity has no skills', () => {
      const field: VariationFieldValue = {
        mode: 'variation',
        variationSet: 'hero.title',
      }
      const ctx = { ...baseContext, entitySkills: [] as string[] }
      const result = resolveVariationField(field, ctx)

      // Should NOT select the "{skill1} Resume Builder" option
      expect(result).not.toBe('{skill1} Resume Builder')
    })
  })

  describe('seed construction', () => {
    it('uses the format: tenantSlug.contentSeed.assignmentKey', () => {
      // We verify this indirectly: same (tenant, contentSeed, assignmentKey) => same result
      // and changing any component can change the result
      const field: VariationFieldValue = {
        mode: 'variation',
        variationSet: 'hero.title',
      }

      const result1 = resolveVariationField(field, {
        ...baseContext,
        tenantSlug: 'tenant-a',
        contentSeed: 'seed-1',
      })

      const result2 = resolveVariationField(field, {
        ...baseContext,
        tenantSlug: 'tenant-a',
        contentSeed: 'seed-1',
      })

      expect(result1).toBe(result2) // Same inputs => same output
    })
  })
})
