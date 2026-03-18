import type { ParsedResumeUrl } from '@/lib/resume-pages/types'

import { describe, expect, it } from 'vitest'

import { validateEntity } from '@/lib/resume-pages/validateEntity'

const mockIndustry = {
  id: 1,
  name: 'Advertising',
  slug: 'advertising',
  category: 10,
  meta: { title: 'Advertising Resumes', description: 'Ad resumes', robots: 'index' },
}

const mockJobTitle = {
  id: 2,
  name: 'Account Manager',
  slug: 'advertising-account-manager',
  industries: [{ id: 1 }],
  suggestedSkills: [
    { id: 100, name: 'Excel' },
    { id: 101, name: 'Salesforce' },
  ],
  meta: { title: 'Account Manager Resume', description: 'AM resume', robots: 'index' },
}

describe('validateEntity', () => {
  it('returns entity data for valid industry page', async () => {
    const mockPayload = {
      find: async ({ collection }: any) => {
        if (collection === 'industries') return { docs: [mockIndustry] }
        return { docs: [] }
      },
    } as any

    const parsed: ParsedResumeUrl = {
      type: 'industry',
      industrySlug: 'advertising',
      fullSlug: 'advertising',
    }

    const result = await validateEntity(mockPayload, parsed)
    expect(result).not.toBeNull()
    expect(result!.industryName).toBe('Advertising')
  })

  it('returns null when industry does not exist', async () => {
    const mockPayload = {
      find: async () => ({ docs: [] as never[] }),
    } as any

    const parsed: ParsedResumeUrl = {
      type: 'industry',
      industrySlug: 'nonexistent',
      fullSlug: 'nonexistent',
    }

    const result = await validateEntity(mockPayload, parsed)
    expect(result).toBeNull()
  })

  it('returns entity data for valid job-title page', async () => {
    const mockPayload = {
      find: async ({ collection }: any) => {
        if (collection === 'industries') return { docs: [mockIndustry] }
        if (collection === 'job-titles') return { docs: [mockJobTitle] }
        return { docs: [] }
      },
    } as any

    const parsed: ParsedResumeUrl = {
      type: 'job-title',
      industrySlug: 'advertising',
      jobTitleSlug: 'advertising-account-manager',
      adjective: 'best',
      builder: 'creator',
      content: 'content',
      contentSeed: 'advertising-account-manager-best-resume-creator-content',
      fullSlug: 'advertising/advertising-account-manager-best-resume-creator-content',
    }

    const result = await validateEntity(mockPayload, parsed)
    expect(result).not.toBeNull()
    expect(result!.jobTitleName).toBe('Account Manager')
    expect(result!.skills).toEqual([])
  })

  it('returns null when job title does not belong to industry', async () => {
    const wrongIndustryJobTitle = {
      ...mockJobTitle,
      industries: [{ id: 999 }],
    }

    const mockPayload = {
      find: async ({ collection }: any) => {
        if (collection === 'industries') return { docs: [mockIndustry] }
        if (collection === 'job-titles') return { docs: [wrongIndustryJobTitle] }
        return { docs: [] }
      },
    } as any

    const parsed: ParsedResumeUrl = {
      type: 'job-title',
      industrySlug: 'advertising',
      jobTitleSlug: 'advertising-account-manager',
      adjective: 'best',
      builder: 'creator',
      content: 'content',
      contentSeed: 'advertising-account-manager-best-resume-creator-content',
      fullSlug: 'advertising/advertising-account-manager-best-resume-creator-content',
    }

    const result = await validateEntity(mockPayload, parsed)
    expect(result).toBeNull()
  })
})
