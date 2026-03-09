import { describe, expect, it } from 'vitest'

import { generateSectionIds } from '@/lib/resume-pages/autoGenerateSectionIds'

describe('generateSectionIds', () => {
  it('generates sectionId from blockType for first occurrence', () => {
    const sections = [
      { blockType: 'testimonials', id: '1' },
      { blockType: 'metrics', id: '2' },
    ]
    const result = generateSectionIds(sections)
    expect(result[0].sectionId).toBe('testimonials')
    expect(result[1].sectionId).toBe('metrics')
  })

  it('appends count suffix for duplicate blockTypes', () => {
    const sections = [
      { blockType: 'testimonials', id: '1' },
      { blockType: 'testimonials', id: '2' },
      { blockType: 'testimonials', id: '3' },
    ]
    const result = generateSectionIds(sections)
    expect(result[0].sectionId).toBe('testimonials')
    expect(result[1].sectionId).toBe('testimonials-2')
    expect(result[2].sectionId).toBe('testimonials-3')
  })

  it('preserves existing sectionId values', () => {
    const sections = [
      { blockType: 'testimonials', sectionId: 'custom-id', id: '1' },
      { blockType: 'testimonials', id: '2' },
    ]
    const result = generateSectionIds(sections)
    expect(result[0].sectionId).toBe('custom-id')
    // Second testimonials gets count 2 (custom-id counted as first occurrence)
    expect(result[1].sectionId).toBe('testimonials-2')
  })

  it('handles empty sections array', () => {
    expect(generateSectionIds([])).toEqual([])
  })

  it('avoids collision with manually-set sectionIds', () => {
    const sections = [
      { blockType: 'testimonials', sectionId: 'testimonials-2', id: '1' },
      { blockType: 'testimonials', id: '2' },
      { blockType: 'testimonials', id: '3' },
    ]
    const result = generateSectionIds(sections)
    expect(result[0].sectionId).toBe('testimonials-2') // preserved
    // count=2, candidate 'testimonials-2' is reserved → skip to 'testimonials-3'
    expect(result[1].sectionId).toBe('testimonials-3')
    // count=3, candidate 'testimonials-3' is now reserved → skip to 'testimonials-4'
    expect(result[2].sectionId).toBe('testimonials-4')
  })

  it('avoids collision with reserved base name', () => {
    const sections = [
      { blockType: 'testimonials', sectionId: 'testimonials', id: '1' },
      { blockType: 'testimonials', id: '2' },
    ]
    const result = generateSectionIds(sections)
    expect(result[0].sectionId).toBe('testimonials') // preserved
    // count=2, candidate 'testimonials-2', not reserved → ok
    expect(result[1].sectionId).toBe('testimonials-2')
  })

  it('does not mutate input array', () => {
    const sections = [{ blockType: 'testimonials', id: '1' }]
    const original = JSON.parse(JSON.stringify(sections))
    generateSectionIds(sections)
    expect(sections).toEqual(original)
  })
})
