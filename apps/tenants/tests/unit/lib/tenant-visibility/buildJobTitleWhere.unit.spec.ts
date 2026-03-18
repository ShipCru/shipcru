import { describe, expect, it } from 'vitest'

import { buildJobTitleWhere } from '@/lib/tenant-visibility/buildJobTitleWhere'

describe('buildJobTitleWhere', () => {
  const industryIds = [10, 20]

  it('filters only by industry when jobTitleMode is all-in-industries', () => {
    expect(
      buildJobTitleWhere({ jobTitleMode: 'all-in-industries' }, industryIds),
    ).toEqual({ industries: { in: [10, 20] } })
  })

  it('adds id-in for specific mode', () => {
    expect(
      buildJobTitleWhere(
        { jobTitleMode: 'specific', jobTitles: [100, 200] },
        industryIds,
      ),
    ).toEqual({
      and: [
        { industries: { in: [10, 20] } },
        { id: { in: [100, 200] } },
      ],
    })
  })

  it('adds id-not_in for exclude-specific mode', () => {
    expect(
      buildJobTitleWhere(
        { jobTitleMode: 'exclude-specific', excludedJobTitles: [99] },
        industryIds,
      ),
    ).toEqual({
      and: [
        { industries: { in: [10, 20] } },
        { id: { not_in: [99] } },
      ],
    })
  })

  it('handles populated objects in jobTitles', () => {
    const jts = [{ id: 1 }, { id: 2 }] as Array<{ id: number } | number>
    expect(
      buildJobTitleWhere({ jobTitleMode: 'specific', jobTitles: jts }, industryIds),
    ).toEqual({
      and: [
        { industries: { in: [10, 20] } },
        { id: { in: [1, 2] } },
      ],
    })
  })
})
