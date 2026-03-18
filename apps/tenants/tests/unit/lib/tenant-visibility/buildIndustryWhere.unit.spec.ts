import { describe, expect, it } from 'vitest'

import { buildIndustryWhere } from '@/lib/tenant-visibility/buildIndustryWhere'

describe('buildIndustryWhere', () => {
  it('returns empty object for mode=all', () => {
    expect(buildIndustryWhere({ mode: 'all', industries: [] })).toEqual({})
  })

  it('returns in-clause for mode=include', () => {
    expect(buildIndustryWhere({ mode: 'include', industries: [1, 2] })).toEqual({
      id: { in: [1, 2] },
    })
  })

  it('returns not_in-clause for mode=exclude', () => {
    expect(buildIndustryWhere({ mode: 'exclude', industries: [3] })).toEqual({
      id: { not_in: [3] },
    })
  })

  it('handles populated objects', () => {
    const industries = [{ id: 5 }, { id: 6 }] as Array<{ id: number } | number>
    expect(buildIndustryWhere({ mode: 'include', industries })).toEqual({
      id: { in: [5, 6] },
    })
  })

  it('returns empty object for include with empty list', () => {
    expect(buildIndustryWhere({ mode: 'include', industries: [] })).toEqual({})
  })
})
