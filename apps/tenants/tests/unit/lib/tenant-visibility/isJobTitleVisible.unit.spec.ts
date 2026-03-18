import { describe, expect, it } from 'vitest'

import { isJobTitleVisible } from '@/lib/tenant-visibility/isJobTitleVisible'

describe('isJobTitleVisible', () => {
  it('returns true when jobTitleMode is all-in-industries', () => {
    expect(
      isJobTitleVisible({ jobTitleMode: 'all-in-industries' }, 'account-manager'),
    ).toBe(true)
  })

  it('returns true when jobTitleMode is null (defaults to all)', () => {
    expect(isJobTitleVisible({ jobTitleMode: null }, 'account-manager')).toBe(true)
  })

  it('returns true when specific mode and slug matches', () => {
    const cfg = {
      jobTitleMode: 'specific' as const,
      jobTitles: [{ slug: 'account-manager' }, { slug: 'data-analyst' }] as Array<
        { slug: string } | number
      >,
    }
    expect(isJobTitleVisible(cfg, 'account-manager')).toBe(true)
  })

  it('returns false when specific mode and slug does not match', () => {
    const cfg = {
      jobTitleMode: 'specific' as const,
      jobTitles: [{ slug: 'data-analyst' }] as Array<{ slug: string } | number>,
    }
    expect(isJobTitleVisible(cfg, 'account-manager')).toBe(false)
  })

  it('returns false when specific mode and list is empty', () => {
    const cfg = {
      jobTitleMode: 'specific' as const,
      jobTitles: [] as Array<{ slug: string } | number>,
    }
    expect(isJobTitleVisible(cfg, 'account-manager')).toBe(false)
  })

  it('returns true when exclude-specific and slug is not excluded', () => {
    const cfg = {
      jobTitleMode: 'exclude-specific' as const,
      excludedJobTitles: [{ slug: 'data-analyst' }] as Array<{ slug: string } | number>,
    }
    expect(isJobTitleVisible(cfg, 'account-manager')).toBe(true)
  })

  it('returns false when exclude-specific and slug is excluded', () => {
    const cfg = {
      jobTitleMode: 'exclude-specific' as const,
      excludedJobTitles: [{ slug: 'account-manager' }] as Array<{ slug: string } | number>,
    }
    expect(isJobTitleVisible(cfg, 'account-manager')).toBe(false)
  })
})
