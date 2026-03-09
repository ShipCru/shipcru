import type { Payload } from 'payload'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { generateCacheTag } from '@/utilities/generateCacheTag'

export interface VariationSet {
  assignmentKey: string
  options: Array<{ text: string; weight: number }>
}

/**
 * Raw query — loads all content variation sets into a Map keyed by assignmentKey.
 */
export async function getVariationSets(payload: Payload): Promise<Map<string, VariationSet>> {
  const result = await payload.find({
    collection: 'content-variations',
    limit: 0,
    depth: 0,
  })

  const map = new Map<string, VariationSet>()
  for (const doc of result.docs) {
    const key = doc.assignmentKey
    if (!key) continue

    const options = (doc.options ?? []).flatMap((opt) => {
      if (!opt.text || opt.weight == null) return []
      return [{ text: opt.text, weight: opt.weight }]
    })

    if (options.length > 0) {
      map.set(key, { assignmentKey: key, options })
    }
  }
  return map
}

/**
 * Cached version.
 */
export const getCachedVariationSets = unstable_cache(
  async (): Promise<Map<string, VariationSet>> => {
    const payload = await getPayload({ config })
    return getVariationSets(payload)
  },
  ['collection_content-variations'],
  { tags: [generateCacheTag({ type: 'collection', collection: 'content-variations' })] },
)
