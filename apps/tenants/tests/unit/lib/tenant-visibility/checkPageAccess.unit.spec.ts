import type { ParsedResumeUrl } from '@/lib/resume-pages/types'
import type { Tenant } from '@/payload-types'

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

function makeConfig(overrides: Partial<Tenant>): Tenant {
  return {
    id: 1,
    name: 'test',
    slug: 'test',
    industryMode: 'all',
    jobTitleMode: 'all-in-industries',
    updatedAt: '',
    createdAt: '',
    ...overrides,
  } as Tenant
}

describe('checkPageAccess', () => {
  it('returns false when config is null', () => {
    expect(checkPageAccess(null, industryParsed, { industryId: 1 })).toBe(false)
  })

  it('returns true when mode is all', () => {
    expect(
      checkPageAccess(makeConfig({ industryMode: 'all' }), industryParsed, { industryId: 1 }),
    ).toBe(true)
  })

  it('returns true when mode is include and industry is included', () => {
    const cfg = makeConfig({ industryMode: 'include', industries: [1] })
    expect(checkPageAccess(cfg, industryParsed, { industryId: 1 })).toBe(true)
  })

  it('returns false when mode is include and industry is not included', () => {
    const cfg = makeConfig({ industryMode: 'include', industries: [999] })
    expect(checkPageAccess(cfg, industryParsed, { industryId: 1 })).toBe(false)
  })

  it('returns false when mode is exclude and industry is excluded', () => {
    const cfg = makeConfig({ industryMode: 'exclude', industries: [{ id: 1 } as any] })
    expect(checkPageAccess(cfg, industryParsed, { industryId: 1 })).toBe(false)
  })

  it('returns false when jobTitleMode is specific and slug not listed', () => {
    const cfg = makeConfig({
      industryMode: 'all',
      jobTitleMode: 'specific',
      jobTitles: [{ slug: 'other-title' } as any],
    })
    expect(checkPageAccess(cfg, jobTitleParsed, { industryId: 1 })).toBe(false)
  })

  it('returns false when jobTitleMode is exclude-specific and slug is excluded', () => {
    const cfg = makeConfig({
      industryMode: 'all',
      jobTitleMode: 'exclude-specific',
      excludedJobTitles: [{ slug: 'account-manager' } as any],
    })
    expect(checkPageAccess(cfg, jobTitleParsed, { industryId: 1 })).toBe(false)
  })

  it('skips job title check for industry pages', () => {
    const cfg = makeConfig({
      industryMode: 'all',
      jobTitleMode: 'specific',
      jobTitles: [{ slug: 'other-title' } as any],
    })
    expect(checkPageAccess(cfg, industryParsed, { industryId: 1 })).toBe(true)
  })
})
