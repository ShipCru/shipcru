import type { GenerateFullText } from '../types'
import type { DocToSync } from '@payloadcms/plugin-search/types'
import type { Payload, PayloadRequest } from 'payload'

import { getSuffixWords } from '@/globals/SuffixVariations/queries/getSuffixWords'
import { resolveCanonicalSuffix } from '@/lib/resume-pages/resolveCanonicalSuffix'
import { getEntityId } from '@/utilities/getEntityId'

interface BeforeSyncArgs {
  originalDoc: Record<string, any>
  payload: Payload
  req: PayloadRequest
  searchDoc: DocToSync
}

export function createBeforeSync(fullTextExtractors: Record<string, GenerateFullText>) {
  return async ({ originalDoc, payload, searchDoc }: BeforeSyncArgs): Promise<DocToSync> => {
    const collectionSlug = searchDoc.doc.relationTo
    const generateFullText = fullTextExtractors[collectionSlug]

    if (!generateFullText) return searchDoc

    const fullText = generateFullText(originalDoc)

    const enriched: Record<string, any> = {
      ...searchDoc,
      title: searchDoc.title || originalDoc.name || originalDoc.title,
      fullText,
      sourceSlug: originalDoc.slug ?? null,
    }

    if (collectionSlug === 'job-titles') {
      try {
        const suffixData = await getSuffixWords(payload)
        const suffix = await resolveCanonicalSuffix(payload, originalDoc, suffixData)
        if (suffix) {
          enriched.suffixAdjective = suffix.adjective
          enriched.suffixResumeWord = suffix.resumeWord
          enriched.suffixBuilder = suffix.builder
          enriched.suffixContentWord = suffix.contentWord
        }
      } catch (err) {
        payload.logger.error({
          err,
          msg: 'Failed to resolve canonical suffix for search sync',
        })
      }

      const industryIds = (originalDoc.industries ?? []).map(getEntityId).filter(Boolean)

      if (industryIds.length > 0) {
        try {
          const industry = await payload.findByID({
            collection: 'industries',
            id: industryIds[0] as number,
            select: { slug: true },
          })
          enriched.industrySlug = industry?.slug ?? null
        } catch {
          enriched.industrySlug = null
        }
      }
    }

    if (collectionSlug === 'resume-content') {
      enriched.contentType = originalDoc.type ?? null
    }

    return enriched as DocToSync
  }
}
