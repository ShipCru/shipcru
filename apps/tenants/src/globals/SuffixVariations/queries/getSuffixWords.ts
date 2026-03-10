import type { WordFormSet } from '@/payload-types'
import type { Payload } from 'payload'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { WORD_FORM_SET_LOOKUP_FIELD } from '@/collections/WordFormSets/constants'
import { generateCacheTag } from '@/utilities/generateCacheTag'

function extractWords(
  items: Array<{ wordFormSet?: WordFormSet | number | null }> | null | undefined,
  wordFormSetType: string,
): string[] {
  const field = WORD_FORM_SET_LOOKUP_FIELD[wordFormSetType] as keyof WordFormSet | undefined
  if (!field) return []

  return (items ?? []).flatMap((item) => {
    const doc = item.wordFormSet
    if (!doc || typeof doc === 'number') return []
    const value = doc[field]
    return typeof value === 'string' && value ? [value] : []
  })
}

export async function getSuffixWords(payload: Payload) {
  const global = await payload.findGlobal({ slug: 'suffix-variations', depth: 1 })

  return {
    adjectives: extractWords(global.adjectives, 'adjective'),
    builders: extractWords(global.builders, 'verb'),
    contentWords: extractWords(global.contentWords, 'contentWord'),
  }
}

export const getCachedSuffixWords = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return getSuffixWords(payload)
  },
  ['global_suffix-variations'],
  {
    tags: [
      generateCacheTag({ type: 'global', slug: 'suffix-variations' }),
      generateCacheTag({ type: 'collection', collection: 'word-form-sets' }),
    ],
  },
)
