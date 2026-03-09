import type { SectionConfig } from '@/lib/resume-pages/types'

import { describe, expect, it } from 'vitest'

import { orderSections } from '@/lib/resume-pages/orderSections'

function makeSectionConfig(overrides: Partial<SectionConfig> = {}): SectionConfig {
  return {
    blockType: 'testimonials',
    sectionId: 'testimonials',
    sectionGroup: 'test',
    hidden: false,
    locked: false,
    fields: {},
    ...overrides,
  }
}

describe('orderSections', () => {
  it('puts "before" sections first, "test" in middle, "after" last', () => {
    const sections = [
      makeSectionConfig({ sectionId: 'after-1', sectionGroup: 'after' }),
      makeSectionConfig({ sectionId: 'test-1', sectionGroup: 'test' }),
      makeSectionConfig({ sectionId: 'before-1', sectionGroup: 'before' }),
    ]
    const result = orderSections({ sections, baseSlug: 'software-engineer' })
    expect(result[0].sectionId).toBe('before-1')
    expect(result[result.length - 1].sectionId).toBe('after-1')
  })

  it('preserves relative order within "before" group', () => {
    const sections = [
      makeSectionConfig({ sectionId: 'before-2', sectionGroup: 'before' }),
      makeSectionConfig({ sectionId: 'before-1', sectionGroup: 'before' }),
    ]
    const result = orderSections({ sections, baseSlug: 'anything' })
    expect(result[0].sectionId).toBe('before-2')
    expect(result[1].sectionId).toBe('before-1')
  })

  it('preserves relative order within "after" group', () => {
    const sections = [
      makeSectionConfig({ sectionId: 'after-2', sectionGroup: 'after' }),
      makeSectionConfig({ sectionId: 'after-1', sectionGroup: 'after' }),
    ]
    const result = orderSections({ sections, baseSlug: 'anything' })
    expect(result[0].sectionId).toBe('after-2')
    expect(result[1].sectionId).toBe('after-1')
  })

  it('is deterministic: same baseSlug always produces same order', () => {
    const sections = [
      makeSectionConfig({ sectionId: 'test-a', blockType: 'a', sectionGroup: 'test' }),
      makeSectionConfig({ sectionId: 'test-b', blockType: 'b', sectionGroup: 'test' }),
      makeSectionConfig({ sectionId: 'test-c', blockType: 'c', sectionGroup: 'test' }),
      makeSectionConfig({ sectionId: 'test-d', blockType: 'd', sectionGroup: 'test' }),
      makeSectionConfig({ sectionId: 'test-e', blockType: 'e', sectionGroup: 'test' }),
    ]
    const result1 = orderSections({ sections, baseSlug: 'software-engineer' })
    const result2 = orderSections({ sections, baseSlug: 'software-engineer' })
    expect(result1.map((s) => s.sectionId)).toEqual(result2.map((s) => s.sectionId))
  })

  it('produces different order for different baseSlug values', () => {
    const sections = [
      makeSectionConfig({ sectionId: 'test-a', blockType: 'a', sectionGroup: 'test' }),
      makeSectionConfig({ sectionId: 'test-b', blockType: 'b', sectionGroup: 'test' }),
      makeSectionConfig({ sectionId: 'test-c', blockType: 'c', sectionGroup: 'test' }),
      makeSectionConfig({ sectionId: 'test-d', blockType: 'd', sectionGroup: 'test' }),
      makeSectionConfig({ sectionId: 'test-e', blockType: 'e', sectionGroup: 'test' }),
      makeSectionConfig({ sectionId: 'test-f', blockType: 'f', sectionGroup: 'test' }),
    ]
    const slugA = orderSections({ sections, baseSlug: 'software-engineer' })
    const slugB = orderSections({ sections, baseSlug: 'data-scientist' })
    // With 6 items, the probability of same order from different seeds is 1/720.
    const idsA = slugA.map((s) => s.sectionId).join(',')
    const idsB = slugB.map((s) => s.sectionId).join(',')
    expect(idsA).not.toBe(idsB)
  })

  it('handles empty sections array', () => {
    const result = orderSections({ sections: [], baseSlug: 'anything' })
    expect(result).toEqual([])
  })

  it('handles sections with only "before" and "after" groups (no test)', () => {
    const sections = [
      makeSectionConfig({ sectionId: 'after-1', sectionGroup: 'after' }),
      makeSectionConfig({ sectionId: 'before-1', sectionGroup: 'before' }),
    ]
    const result = orderSections({ sections, baseSlug: 'anything' })
    expect(result[0].sectionId).toBe('before-1')
    expect(result[1].sectionId).toBe('after-1')
  })

  it('handles single test section (no shuffle needed)', () => {
    const sections = [makeSectionConfig({ sectionId: 'only-test', sectionGroup: 'test' })]
    const result = orderSections({ sections, baseSlug: 'anything' })
    expect(result).toHaveLength(1)
    expect(result[0].sectionId).toBe('only-test')
  })
})
