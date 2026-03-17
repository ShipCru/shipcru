import type { ParsedResumeUrl } from '@/lib/resume-pages/types'
import type { EntityData } from '@/lib/resume-pages/validateEntity'
import type { TenantPageConfig } from '@/payload-types'

import { describe, expect, it } from 'vitest'

import { checkTenantPageConfig } from '@/lib/resume-pages/checkTenantPageConfig'

const baseEntity: EntityData = {
  id: 2,
  industryId: 1,
  industryName: 'Advertising',
  categoryId: 10,
  skills: [],
}

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

describe('checkTenantPageConfig', () => {
  it('returns false when no config exists for tenant', () => {
    const result = checkTenantPageConfig(null, industryParsed, baseEntity)
    expect(result).toBe(false)
  })

  it('returns true when mode is "all"', () => {
    const result = checkTenantPageConfig(makeConfig({ mode: 'all' }), industryParsed, baseEntity)
    expect(result).toBe(true)
  })

  it('returns true when mode is "include" and industry is included', () => {
    const cfg = makeConfig({
      mode: 'include',
      industries: [
        { id: 1 } as TenantPageConfig['industries'] extends (infer T)[] | null | undefined
          ? T
          : never,
      ],
    })
    const result = checkTenantPageConfig(cfg, industryParsed, baseEntity)
    expect(result).toBe(true)
  })

  it('returns false when mode is "include" and industry is not included', () => {
    const cfg = makeConfig({
      mode: 'include',
      industries: [999],
    })
    const result = checkTenantPageConfig(cfg, industryParsed, baseEntity)
    expect(result).toBe(false)
  })

  it('returns false when mode is "exclude" and industry is excluded', () => {
    const cfg = makeConfig({
      mode: 'exclude',
      industries: [
        { id: 1 } as TenantPageConfig['industries'] extends (infer T)[] | null | undefined
          ? T
          : never,
      ],
    })
    const result = checkTenantPageConfig(cfg, industryParsed, baseEntity)
    expect(result).toBe(false)
  })

  it('returns false when jobTitleMode is "specific" and job title not listed', () => {
    const cfg = makeConfig({
      mode: 'all',
      jobTitleMode: 'specific',
      jobTitles: [
        { slug: 'other-title' } as TenantPageConfig['jobTitles'] extends
          | (infer T)[]
          | null
          | undefined
          ? T
          : never,
      ],
    })
    const result = checkTenantPageConfig(cfg, jobTitleParsed, baseEntity)
    expect(result).toBe(false)
  })

  it('returns false when jobTitleMode is "exclude-specific" and job title is excluded', () => {
    const cfg = makeConfig({
      mode: 'all',
      jobTitleMode: 'exclude-specific',
      excludedJobTitles: [
        { slug: 'account-manager' } as TenantPageConfig['excludedJobTitles'] extends
          | (infer T)[]
          | null
          | undefined
          ? T
          : never,
      ],
    })
    const result = checkTenantPageConfig(cfg, jobTitleParsed, baseEntity)
    expect(result).toBe(false)
  })
})
