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
 * Raw query — loads all content variation sets into a Record keyed by assignmentKey.
 * Also indexes each set by its document ID (stringified) so that relationship
 * references (number IDs from depth-0 queries) can be resolved.
 *
 * Returns a plain Record (not a Map) because unstable_cache serialises via JSON
 * and Maps become empty objects after serialisation.
 */
export async function getVariationSets(payload: Payload) {
  const result = await payload.find({
    collection: 'content-variations',
    limit: 0,
    depth: 0,
  })

  const record: Record<string, VariationSet> = {}
  for (const doc of result.docs) {
    const key = doc.assignmentKey
    if (!key) continue

    const options = (doc.options ?? []).flatMap((opt) => {
      if (!opt.text || opt.weight == null) return []
      return [{ text: opt.text, weight: opt.weight }]
    })

    if (options.length > 0) {
      const entry: VariationSet = { assignmentKey: key, options }
      record[key] = entry
      // Also index by document ID so relationship references resolve correctly
      record[String(doc.id)] = entry
    }
  }
  return record
}

/**
 * Cached version.
 */
export const getCachedVariationSets = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return getVariationSets(payload)
  },
  ['collection_content-variations'],
  { tags: [generateCacheTag({ type: 'collection', collection: 'content-variations' })] },
)
