import { describe, expect, it } from 'vitest'

import { generateCacheTag } from '@/utilities/generateCacheTag'

describe('generateCacheTag', () => {
  it('generates global cache tags', () => {
    expect(generateCacheTag({ type: 'global', slug: 'suffix-variations' })).toBe(
      'global_suffix-variations',
    )
  })

  it('generates collection cache tags', () => {
    expect(generateCacheTag({ type: 'collection', collection: 'content-variations' })).toBe(
      'collection_content-variations',
    )
  })

  it('generates document cache tags', () => {
    expect(
      generateCacheTag({ type: 'document', collection: 'industries', slug: 'advertising' }),
    ).toBe('document_industries_advertising')
  })

  it('generates resume page cache tags', () => {
    expect(generateCacheTag({ type: 'resume-page', tenantSlug: 'acme', path: 'advertising' })).toBe(
      'resume-page_acme_advertising',
    )
  })
})
