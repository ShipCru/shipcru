import type { SuffixWordsData } from '@/globals/SuffixVariations/queries/getSuffixWords'
import type { Payload } from 'payload'

import { WORD_FORM_SET_LOOKUP_FIELD } from '@/collections/WordFormSets/constants'
import { WordFormSet } from '@/payload-types'

export interface CanonicalSuffix {
  adjective: string
  resumeWord: string
  builder: string
  contentWord: string
  strategy: 'redirect-301' | 'redirect-302' | 'rel-canonical'
}

/**
 * Resolves the canonical suffix for a job title.
 * Checks job-title-level overrides first, then falls back to global defaults.
 *
 * Returns null if no canonical suffix is configured (no isCanonical flags set
 * and no override on the job title).
 */
export async function resolveCanonicalSuffix(
  payload: Payload,
  jobTitle: {
    overrideSuffix?: boolean | null
    suffixAdjective?: number | string | null
    suffixBuilder?: number | string | null
    suffixContentWord?: number | string | null
    suffixStrategy?: string | null
  },
  suffixData: SuffixWordsData,
): Promise<CanonicalSuffix | null> {
  // Check job-title-level override
  if (jobTitle.overrideSuffix) {
    const [adjDoc, builderDoc, contentDoc] = await Promise.all([
      fetchWordFormSet(payload, jobTitle.suffixAdjective),
      fetchWordFormSet(payload, jobTitle.suffixBuilder),
      fetchWordFormSet(payload, jobTitle.suffixContentWord),
    ])

    const adj = extractWordFromDoc(adjDoc, 'adjective')
    const builder = extractWordFromDoc(builderDoc, 'verb')
    const content = extractWordFromDoc(contentDoc, 'contentWord')

    if (adj && builder && content) {
      return {
        adjective: adj,
        resumeWord: suffixData.canonicalResumeWord ?? 'resume',
        builder,
        contentWord: content,
        strategy:
          (jobTitle.suffixStrategy as CanonicalSuffix['strategy']) ??
          (suffixData.canonicalStrategy as CanonicalSuffix['strategy']) ??
          'rel-canonical',
      }
    }
  }

  // Fall back to global canonical
  if (
    suffixData.canonicalAdjective &&
    suffixData.canonicalBuilder &&
    suffixData.canonicalContentWord
  ) {
    return {
      adjective: suffixData.canonicalAdjective,
      resumeWord: suffixData.canonicalResumeWord ?? 'resume',
      builder: suffixData.canonicalBuilder,
      contentWord: suffixData.canonicalContentWord,
      strategy: (suffixData.canonicalStrategy as CanonicalSuffix['strategy']) ?? 'rel-canonical',
    }
  }

  return null
}

function fetchWordFormSet(payload: Payload, id: number | string | null | undefined) {
  if (!id) return null
  return payload.findByID({ collection: 'word-form-sets', id, depth: 0 })
}

function extractWordFromDoc(
  doc: WordFormSet | null,
  wordFormSetType: keyof typeof WORD_FORM_SET_LOOKUP_FIELD,
): string | undefined {
  if (!doc) return undefined

  const field = WORD_FORM_SET_LOOKUP_FIELD[wordFormSetType]
  if (!field) return undefined

  const value = doc[field]
  return typeof value === 'string' && value ? value : undefined
}
