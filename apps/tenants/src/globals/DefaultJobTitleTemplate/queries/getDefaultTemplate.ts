import type { Payload } from 'payload'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { generateCacheTag } from '@/utilities/generateCacheTag'

/**
 * Raw query — loads the default job-title template global.
 */
export async function getDefaultTemplate(payload: Payload) {
  return payload.findGlobal({ slug: 'default-job-title-template' })
}

/**
 * Cached version.
 */
export const getCachedDefaultTemplate = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return getDefaultTemplate(payload)
  },
  ['global_default-job-title-template'],
  { tags: [generateCacheTag({ type: 'global', slug: 'default-job-title-template' })] },
)
