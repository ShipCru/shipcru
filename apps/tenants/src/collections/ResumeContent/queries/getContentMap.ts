import type { ResumeContent as ResumeContentType } from '@/payload-types'
import type { Payload } from 'payload'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { generateCacheTag } from '@/utilities/generateCacheTag'

export async function getContentMap(payload: Payload) {
  const result = await payload.find({
    collection: 'resume-content',
    pagination: false,
    depth: 0,
  })

  const record: Record<string, ResumeContentType> = {}
  for (const doc of result.docs) {
    record[String(doc.id)] = doc
  }
  return record
}

export const getCachedContentMap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return getContentMap(payload)
  },
  ['collection_resume-content'],
  {
    tags: [generateCacheTag({ type: 'collection', collection: 'resume-content' })],
  },
)
