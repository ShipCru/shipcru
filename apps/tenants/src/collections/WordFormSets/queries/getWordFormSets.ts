import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { generateCacheTag } from '@/utilities/generateCacheTag'

/**
 * Raw query — loads all word form sets as a flat array.
 */
export async function getWordFormSets(payload: Awaited<ReturnType<typeof getPayload>>) {
  const result = await payload.find({
    collection: 'word-form-sets',
    limit: 0,
    depth: 0,
  })

  return result.docs
}

/**
 * Cached version — revalidated when word-form-sets are edited.
 */
export const getCachedWordFormSets = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return getWordFormSets(payload)
  },
  ['collection_word-form-sets'],
  { tags: [generateCacheTag({ type: 'collection', collection: 'word-form-sets' })] },
)
