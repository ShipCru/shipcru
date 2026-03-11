import type { Payload } from 'payload'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { generateCacheTag } from '@/utilities/generateCacheTag'

export async function getHeader(payload: Payload) {
  return payload.findGlobal({ slug: 'header', depth: 2 })
}

export const getCachedHeader = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return getHeader(payload)
  },
  ['global_header'],
  { tags: [generateCacheTag({ type: 'global', slug: 'header' })] },
)
