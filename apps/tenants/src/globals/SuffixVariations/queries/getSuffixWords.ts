import type { WordFormSet } from '@/payload-types'
import type { Payload } from 'payload'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { WORD_FORM_SET_LOOKUP_FIELD } from '@/collections/WordFormSets/constants'
import { generateCacheTag } from '@/utilities/generateCacheTag'

interface WordEntry {
  wordFormSet?: WordFormSet | number | null
  isCanonical?: boolean | null
}

function extractWords(
  items: WordEntry[] | null | undefined,
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

function extractCanonicalWord(
  items: WordEntry[] | null | undefined,
  wordFormSetType: string,
): string | null {
  const field = WORD_FORM_SET_LOOKUP_FIELD[wordFormSetType] as keyof WordFormSet | undefined
  if (!field) return null

  const canonical = (items ?? []).find((item) => item.isCanonical)
  if (!canonical) return null

  const doc = canonical.wordFormSet
  if (!doc || typeof doc === 'number') return null
  const value = doc[field]
  return typeof value === 'string' && value ? value : null
}

export interface SuffixWordsData {
  adjectives: string[]
  builders: string[]
  contentWords: string[]
  canonicalAdjective: string | null
  canonicalBuilder: string | null
  canonicalContentWord: string | null
  canonicalStrategy: string
}

export async function getSuffixWords(payload: Payload): Promise<SuffixWordsData> {
  const global = await payload.findGlobal({ slug: 'suffix-variations', depth: 1 })

  return {
    adjectives: extractWords(global.adjectives, 'adjective'),
    builders: extractWords(global.builders, 'verb'),
    contentWords: extractWords(global.contentWords, 'contentWord'),
    canonicalAdjective: extractCanonicalWord(global.adjectives, 'adjective'),
    canonicalBuilder: extractCanonicalWord(global.builders, 'verb'),
    canonicalContentWord: extractCanonicalWord(global.contentWords, 'contentWord'),
    canonicalStrategy: global.canonicalStrategy ?? 'rel-canonical',
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
