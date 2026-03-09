import type { Payload } from 'payload'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { generateCacheTag } from '@/utilities/generateCacheTag'

const extractWords = (items: Array<{ word?: string | null }> | null | undefined): string[] =>
  (items ?? []).flatMap((item) => (item.word ? [item.word] : []))

export async function getSuffixWords(payload: Payload) {
  const global = await payload.findGlobal({ slug: 'suffix-variations' })

  return {
    adjectives: extractWords(global.adjectives),
    builders: extractWords(global.builders),
    contentWords: extractWords(global.contentWords),
  }
}

export const getCachedSuffixWords = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return getSuffixWords(payload)
  },
  ['global_suffix-variations'],
  { tags: [generateCacheTag({ type: 'global', slug: 'suffix-variations' })] },
)
