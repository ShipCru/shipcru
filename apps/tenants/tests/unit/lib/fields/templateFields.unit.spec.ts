import { describe, expect, it } from 'vitest'

import { heroField, sectionsField } from '@/lib/fields/templateFields'

describe('templateFields', () => {
  describe('heroField', () => {
    it('returns a blocks field named "hero" with maxRows 1', () => {
      const field = heroField()
      expect(field.name).toBe('hero')
      expect(field.type).toBe('blocks')
      expect(field.maxRows).toBe(1)
    })

    it('includes HERO_BLOCKS', () => {
      const field = heroField()
      expect(field.blocks.length).toBeGreaterThan(0)
      expect(field.blocks[0].slug).toBe('heroSplit')
    })
  })

  describe('sectionsField', () => {
    it('returns a blocks field named "sections"', () => {
      const field = sectionsField()
      expect(field.name).toBe('sections')
      expect(field.type).toBe('blocks')
    })

    it('includes LAYOUT_BLOCKS', () => {
      const field = sectionsField()
      expect(field.blocks.length).toBeGreaterThanOrEqual(4)
    })
  })
})
