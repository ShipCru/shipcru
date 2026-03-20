import type { CollectionBeforeChangeHook } from 'payload'

import {
  buildTemplateWordPools,
  getCachedSuffixWords,
} from '@/globals/SuffixVariations/queries/getSuffixWords'
import { isValidKeywordSlug } from '@/lib/keyword-landings/templatePatterns'

/**
 * Warns (but does not block) when a root-level page slug collides with a
 * valid keyword landing URL. The page will override the auto-generated
 * keyword landing for that slug.
 */
export const warnKeywordCollision: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  req,
}) => {
  const parent = data?.parent ?? originalDoc?.parent
  if (parent) return data

  const slug = data?.slug ?? originalDoc?.slug
  if (!slug) return data

  const suffixData = await getCachedSuffixWords()
  const pools = buildTemplateWordPools(suffixData)

  if (isValidKeywordSlug(slug, pools)) {
    req.payload.logger.warn(
      `Page slug "${slug}" overrides an auto-generated keyword landing page. This is allowed but the keyword landing will no longer be served for this slug.`,
    )
  }

  return data
}
