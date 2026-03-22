import { describe, expect, it } from 'vitest'

import { isIndustryVisible } from '@/lib/tenant-visibility/isIndustryVisible'

describe('isIndustryVisible', () => {
  it('returns true when mode is all', () => {
    expect(isIndustryVisible({ industryMode: 'all', industries: [] }, 1)).toBe(true)
  })

  it('returns true when mode is null (defaults to all)', () => {
    expect(isIndustryVisible({ industryMode: null, industries: [] }, 1)).toBe(true)
  })

  it('returns true when mode is include and industry is in list', () => {
    expect(isIndustryVisible({ industryMode: 'include', industries: [1, 2] }, 1)).toBe(true)
  })

  it('returns false when mode is include and industry is not in list', () => {
    expect(isIndustryVisible({ industryMode: 'include', industries: [2, 3] }, 1)).toBe(false)
  })

  it('returns false when mode is include and list is empty', () => {
    expect(isIndustryVisible({ industryMode: 'include', industries: [] }, 1)).toBe(false)
  })

  it('returns true when mode is exclude and industry is not in list', () => {
    expect(isIndustryVisible({ industryMode: 'exclude', industries: [2, 3] }, 1)).toBe(true)
  })

  it('returns false when mode is exclude and industry is in list', () => {
    expect(isIndustryVisible({ industryMode: 'exclude', industries: [1, 2] }, 1)).toBe(false)
  })

  it('handles populated objects with { id }', () => {
    const industries = [{ id: 5 }, { id: 6 }] as Array<{ id: number } | number>
    expect(isIndustryVisible({ industryMode: 'include', industries }, 5)).toBe(true)
    expect(isIndustryVisible({ industryMode: 'include', industries }, 7)).toBe(false)
  })
})
