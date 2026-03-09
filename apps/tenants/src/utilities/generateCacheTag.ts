export type CacheTagParams =
  | { type: 'global'; slug: string }
  | { type: 'collection'; collection: string }
  | { type: 'document'; collection: string; slug: string }
  | { type: 'resume-page'; tenantSlug: string; path: string }

export function generateCacheTag(params: CacheTagParams): string {
  switch (params.type) {
    case 'global':
      return `global_${params.slug}`
    case 'collection':
      return `collection_${params.collection}`
    case 'document':
      return `document_${params.collection}_${params.slug}`
    case 'resume-page':
      return `resume-page_${params.tenantSlug}_${params.path}`
  }
}
