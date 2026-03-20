import type { WordFormSet } from '@/payload-types'
import type { Payload } from 'payload'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { WORD_FORM_SET_LOOKUP_FIELD } from '@/collections/WordFormSets/constants'
import { generateCacheTag } from '@/utilities/generateCacheTag'

export type { SuffixWordEntry, SuffixWordsData } from './suffixWordPools'
export {
  buildCanonicalWordPools,
  buildTemplateWordPools,
  getCanonical,
  getValues,
} from './suffixWordPools'

import type { SuffixWordEntry, SuffixWordsData } from './suffixWordPools'

interface WordEntry {
  wordFormSet?: WordFormSet | number | null
  isCanonical?: boolean | null
}

type WordFormSetField = keyof WordFormSet & string

function extractEntries(
  items: WordEntry[] | null | undefined,
  wordFormSetType: keyof typeof WORD_FORM_SET_LOOKUP_FIELD,
): SuffixWordEntry[] {
  const field = WORD_FORM_SET_LOOKUP_FIELD[wordFormSetType]
  if (!field) return []

  return (items ?? []).flatMap((item) => {
    const doc = item.wordFormSet
    if (!doc || typeof doc === 'number') return []
    const value = doc[field]
    if (typeof value !== 'string' || !value) return []
    return [{ value, isCanonical: !!item.isCanonical }]
  })
}

function extractEntriesWithField(
  items: WordEntry[] | null | undefined,
  field: WordFormSetField,
): SuffixWordEntry[] {
  return (items ?? []).flatMap((item) => {
    const doc = item.wordFormSet
    if (!doc || typeof doc === 'number') return []
    const value = doc[field]
    if (typeof value !== 'string' || !value) return []
    return [{ value, isCanonical: !!item.isCanonical }]
  })
}

export async function getSuffixWords(payload: Payload): Promise<SuffixWordsData> {
  const global = await payload.findGlobal({ slug: 'suffix-variations', depth: 1 })

  return {
    resumeWords: extractEntries(global.resumeWords, 'resumeWord'),
    adjectives: extractEntries(global.adjectives, 'adjective'),
    builders: extractEntries(global.builders, 'verb'),
    verbs: extractEntriesWithField(global.builders, 'v_singular'),
    contentWords: extractEntries(global.contentWords, 'contentWord'),
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
