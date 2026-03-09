import { describe, expect, it, vi } from 'vitest'

// Mock modules that rely on Next.js / Payload runtime
vi.mock('next/cache', () => ({
  unstable_cache: (fn: any) => fn,
}))
vi.mock('payload', async (importOriginal) => {
  const mod = await importOriginal<typeof import('payload')>()
  return { ...mod, getPayload: vi.fn() }
})
vi.mock('@payload-config', () => ({ default: {} }))

import { getVariationSets } from '@/collections/ContentVariations/queries/getVariationSets'
import { getDefaultTemplate as getIndustryTemplate } from '@/globals/DefaultIndustryTemplate/queries/getDefaultTemplate'
import { getDefaultTemplate as getJobTitleTemplate } from '@/globals/DefaultJobTitleTemplate/queries/getDefaultTemplate'
import { getSuffixWords } from '@/globals/SuffixVariations/queries/getSuffixWords'

describe('getSuffixWords', () => {
  it('returns structured suffix word lists from global', async () => {
    const mockGlobal = {
      adjectives: [{ word: 'best' }, { word: 'top' }],
      builders: [{ word: 'creator' }, { word: 'builder' }],
      contentWords: [{ word: 'content' }, { word: 'ideas' }],
    }
    const mockPayload = {
      findGlobal: async () => mockGlobal,
    } as any

    const result = await getSuffixWords(mockPayload)
    expect(result.adjectives).toEqual(['best', 'top'])
    expect(result.builders).toEqual(['creator', 'builder'])
    expect(result.contentWords).toEqual(['content', 'ideas'])
  })
})

describe('getVariationSets', () => {
  it('returns a Map keyed by assignmentKey', async () => {
    const mockDocs = [
      { assignmentKey: 'hero.title', options: [{ text: 'Option A', weight: 1 }] },
      { assignmentKey: 'hero.subtitle', options: [{ text: 'Option B', weight: 2 }] },
    ]
    const mockPayload = {
      find: async () => ({ docs: mockDocs }),
    } as any

    const result = await getVariationSets(mockPayload)
    expect(result).toBeInstanceOf(Map)
    expect(result.size).toBe(2)
    expect(result.get('hero.title')?.options).toHaveLength(1)
  })
})

describe('getDefaultTemplate (industry)', () => {
  it('loads industry template global', async () => {
    const mockTemplate = { hero: [{ blockType: 'heroSplitImage' }], sections: [] as never[] }
    const mockPayload = {
      findGlobal: async () => mockTemplate,
    } as any

    const result = await getIndustryTemplate(mockPayload)
    expect(result).toEqual(mockTemplate)
  })
})

describe('getDefaultTemplate (job-title)', () => {
  it('loads job-title template global', async () => {
    const mockTemplate = { hero: [{ blockType: 'heroSplitImage' }], sections: [] as never[] }
    const mockPayload = {
      findGlobal: async () => mockTemplate,
    } as any

    const result = await getJobTitleTemplate(mockPayload)
    expect(result).toEqual(mockTemplate)
  })
})
