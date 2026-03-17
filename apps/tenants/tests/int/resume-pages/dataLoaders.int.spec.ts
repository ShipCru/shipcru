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
import { getDefaultTemplate } from '@/globals/DefaultTemplates/queries/getDefaultTemplate'
import { getSuffixWords } from '@/globals/SuffixVariations/queries/getSuffixWords'

describe('getSuffixWords', () => {
  it('returns structured suffix word lists from global', async () => {
    const mockGlobal = {
      adjectives: [
        { wordFormSet: { type: 'adjective', adj_singular: 'best' } },
        { wordFormSet: { type: 'adjective', adj_singular: 'top' } },
      ],
      builders: [
        { wordFormSet: { type: 'verb', v_worder: 'creator' } },
        { wordFormSet: { type: 'verb', v_worder: 'builder' } },
      ],
      contentWords: [
        { wordFormSet: { type: 'contentWord', cw_plural: 'content' } },
        { wordFormSet: { type: 'contentWord', cw_plural: 'ideas' } },
      ],
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
    expect(typeof result).toBe('object')
    expect(Object.keys(result).length).toBeGreaterThanOrEqual(2)
    expect(result['hero.title']?.options).toHaveLength(1)
  })
})

describe('getDefaultTemplate (industry)', () => {
  it('loads industry tab from default-templates global', async () => {
    const mockGlobal = {
      jobTitle: { hero: [] as never[], sections: [] as never[] },
      industry: { hero: [{ blockType: 'heroSplitImage' }], sections: [] as never[] },
      keyword: { hero: [] as never[], sections: [] as never[] },
    }
    const mockPayload = {
      findGlobal: async () => mockGlobal,
    } as any

    const result = await getDefaultTemplate(mockPayload, 'industry')
    expect(result).toEqual(mockGlobal.industry)
  })
})

describe('getDefaultTemplate (job-title)', () => {
  it('loads jobTitle tab from default-templates global', async () => {
    const mockGlobal = {
      jobTitle: { hero: [{ blockType: 'heroSplitImage' }], sections: [] as never[] },
      industry: { hero: [] as never[], sections: [] as never[] },
      keyword: { hero: [] as never[], sections: [] as never[] },
    }
    const mockPayload = {
      findGlobal: async () => mockGlobal,
    } as any

    const result = await getDefaultTemplate(mockPayload, 'jobTitle')
    expect(result).toEqual(mockGlobal.jobTitle)
  })
})
