import type { ResolvedTemplateOverride } from '@/lib/resume-pages/types'

import { describe, expect, it } from 'vitest'

import { sortOverrides } from '@/lib/resume-pages/buildOverrideChain'

function makeOverride(partial: Partial<ResolvedTemplateOverride>): ResolvedTemplateOverride {
  return {
    id: partial.id ?? '1',
    name: partial.name ?? 'Override',
    tenant: partial.tenant ?? null,
    targetType: partial.targetType ?? 'industry',
    targetEntity: partial.targetEntity ?? null,
    sectionOverrides: partial.sectionOverrides ?? [],
  }
}

describe('sortOverrides', () => {
  it('sorts global overrides before tenant overrides', () => {
    const docs = [
      makeOverride({ id: 'tenant-1', tenant: 'T1', targetType: 'industry', targetEntity: 'ind-1' }),
      makeOverride({ id: 'global-1', tenant: null, targetType: 'industry', targetEntity: 'ind-1' }),
    ]
    const result = sortOverrides(docs)
    expect(result[0].id).toBe('global-1')
    expect(result[1].id).toBe('tenant-1')
  })

  it('sorts by specificity: category < industry < job-title', () => {
    const docs = [
      makeOverride({ id: 'slug', tenant: null, targetType: 'job-title', targetEntity: 'jt-1' }),
      makeOverride({
        id: 'cat',
        tenant: null,
        targetType: 'industry-category',
        targetEntity: 'cat-1',
      }),
      makeOverride({ id: 'ind', tenant: null, targetType: 'industry', targetEntity: 'ind-1' }),
    ]
    const result = sortOverrides(docs)
    expect(result.map((d) => d.id)).toEqual(['cat', 'ind', 'slug'])
  })

  it('sorts in full expected order: global(cat,ind,slug) then tenant(cat,ind,slug)', () => {
    const docs = [
      makeOverride({
        id: 'tenant-slug',
        tenant: 'T1',
        targetType: 'job-title',
        targetEntity: 'jt-1',
      }),
      makeOverride({
        id: 'global-ind',
        tenant: null,
        targetType: 'industry',
        targetEntity: 'ind-1',
      }),
      makeOverride({
        id: 'tenant-cat',
        tenant: 'T1',
        targetType: 'industry-category',
        targetEntity: 'cat-1',
      }),
      makeOverride({
        id: 'global-slug',
        tenant: null,
        targetType: 'job-title',
        targetEntity: 'jt-1',
      }),
      makeOverride({
        id: 'tenant-ind',
        tenant: 'T1',
        targetType: 'industry',
        targetEntity: 'ind-1',
      }),
      makeOverride({
        id: 'global-cat',
        tenant: null,
        targetType: 'industry-category',
        targetEntity: 'cat-1',
      }),
    ]
    const result = sortOverrides(docs)
    expect(result.map((d) => d.id)).toEqual([
      'global-cat',
      'global-ind',
      'global-slug',
      'tenant-cat',
      'tenant-ind',
      'tenant-slug',
    ])
  })

  it('returns empty array for empty input', () => {
    expect(sortOverrides([])).toEqual([])
  })

  it('handles single override', () => {
    const docs = [makeOverride({ id: 'only' })]
    const result = sortOverrides(docs)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('only')
  })
})
