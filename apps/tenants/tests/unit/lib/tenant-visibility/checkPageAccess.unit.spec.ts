import type { ParsedResumeUrl } from '@/lib/resume-pages/types'
import type { TenantPageConfig } from '@/payload-types'

import { describe, expect, it } from 'vitest'

import { checkPageAccess } from '@/lib/tenant-visibility/checkPageAccess'

const industryParsed: ParsedResumeUrl = {
  type: 'industry',
  industrySlug: 'advertising',
  fullSlug: 'advertising',
}

const jobTitleParsed: ParsedResumeUrl = {
  type: 'job-title',
  industrySlug: 'advertising',
  jobTitleSlug: 'account-manager',
  adjective: 'best',
  builder: 'creator',
  content: 'content',
  contentSeed: 'account-manager-best-resume-creator-content',
  fullSlug: 'advertising/account-manager-best-resume-creator-content',
}

function makeConfig(overrides: Partial<TenantPageConfig>): TenantPageConfig {
  return {
    id: 1,
    mode: 'all',
    jobTitleMode: 'all-in-industries',
    updatedAt: '',
    createdAt: '',
    ...overrides,
  } as TenantPageConfig
}

describe('checkPageAccess', () => {
  it('returns false when config is null', () => {
    expect(checkPageAccess(null, industryParsed, { industryId: 1 })).toBe(false)
  })

  it('returns true when mode is all', () => {
    expect(
      checkPageAccess(makeConfig({ mode: 'all' }), industryParsed, { industryId: 1 }),
    ).toBe(true)
  })

  it('returns true when mode is include and industry is included', () => {
    const cfg = makeConfig({ mode: 'include', industries: [1] })
    expect(checkPageAccess(cfg, industryParsed, { industryId: 1 })).toBe(true)
  })

  it('returns false when mode is include and industry is not included', () => {
    const cfg = makeConfig({ mode: 'include', industries: [999] })
    expect(checkPageAccess(cfg, industryParsed, { industryId: 1 })).toBe(false)
  })

  it('returns false when mode is exclude and industry is excluded', () => {
    const cfg = makeConfig({ mode: 'exclude', industries: [{ id: 1 } as any] })
    expect(checkPageAccess(cfg, industryParsed, { industryId: 1 })).toBe(false)
  })

  it('returns false when jobTitleMode is specific and slug not listed', () => {
    const cfg = makeConfig({
      mode: 'all',
      jobTitleMode: 'specific',
      jobTitles: [{ slug: 'other-title' } as any],
    })
    expect(checkPageAccess(cfg, jobTitleParsed, { industryId: 1 })).toBe(false)
  })

  it('returns false when jobTitleMode is exclude-specific and slug is excluded', () => {
    const cfg = makeConfig({
      mode: 'all',
      jobTitleMode: 'exclude-specific',
      excludedJobTitles: [{ slug: 'account-manager' } as any],
    })
    expect(checkPageAccess(cfg, jobTitleParsed, { industryId: 1 })).toBe(false)
  })

  it('skips job title check for industry pages', () => {
    const cfg = makeConfig({
      mode: 'all',
      jobTitleMode: 'specific',
      jobTitles: [{ slug: 'other-title' } as any],
    })
    expect(checkPageAccess(cfg, industryParsed, { industryId: 1 })).toBe(true)
  })
})
