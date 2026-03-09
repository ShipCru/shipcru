import type { ParsedResumeUrl } from '@/lib/resume-pages/types'
import type { EntityData } from '@/lib/resume-pages/validateEntity'

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

describe('checkTenantPageConfig', () => {
  it('returns false when no config exists for tenant', async () => {
    const mockPayload = {
      find: async () => ({ docs: [] as never[] }),
    } as any

    const result = await checkTenantPageConfig(mockPayload, 1, industryParsed, baseEntity)
    expect(result).toBe(false)
  })

  it('returns true when mode is "all"', async () => {
    const config = { mode: 'all', jobTitleMode: 'all-in-industries' }
    const mockPayload = {
      find: async () => ({ docs: [config] }),
    } as any

    const result = await checkTenantPageConfig(mockPayload, 1, industryParsed, baseEntity)
    expect(result).toBe(true)
  })

  it('returns true when mode is "include" and industry is included', async () => {
    const config = {
      mode: 'include',
      industries: [{ id: 1 }],
      jobTitleMode: 'all-in-industries',
    }
    const mockPayload = {
      find: async () => ({ docs: [config] }),
    } as any

    const result = await checkTenantPageConfig(mockPayload, 1, industryParsed, baseEntity)
    expect(result).toBe(true)
  })

  it('returns false when mode is "include" and industry is not included', async () => {
    const config = {
      mode: 'include',
      industries: [{ id: 999 }],
      jobTitleMode: 'all-in-industries',
    }
    const mockPayload = {
      find: async () => ({ docs: [config] }),
    } as any

    const result = await checkTenantPageConfig(mockPayload, 1, industryParsed, baseEntity)
    expect(result).toBe(false)
  })

  it('returns false when mode is "exclude" and industry is excluded', async () => {
    const config = {
      mode: 'exclude',
      industries: [{ id: 1 }],
      jobTitleMode: 'all-in-industries',
    }
    const mockPayload = {
      find: async () => ({ docs: [config] }),
    } as any

    const result = await checkTenantPageConfig(mockPayload, 1, industryParsed, baseEntity)
    expect(result).toBe(false)
  })

  it('returns false when jobTitleMode is "specific" and job title not listed', async () => {
    const config = {
      mode: 'all',
      jobTitleMode: 'specific',
      jobTitles: [{ slug: 'other-title' }],
    }
    const mockPayload = {
      find: async () => ({ docs: [config] }),
    } as any

    const result = await checkTenantPageConfig(mockPayload, 1, jobTitleParsed, baseEntity)
    expect(result).toBe(false)
  })

  it('returns false when jobTitleMode is "exclude-specific" and job title is excluded', async () => {
    const config = {
      mode: 'all',
      jobTitleMode: 'exclude-specific',
      excludedJobTitles: [{ slug: 'account-manager' }],
    }
    const mockPayload = {
      find: async () => ({ docs: [config] }),
    } as any

    const result = await checkTenantPageConfig(mockPayload, 1, jobTitleParsed, baseEntity)
    expect(result).toBe(false)
  })
})
