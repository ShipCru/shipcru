import type { Payload } from 'payload'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { generateCacheTag } from '@/utilities/generateCacheTag'

export type TemplatePageType = 'jobTitle' | 'industry' | 'keyword'

interface TemplateTab {
  hero?: object[]
  sections?: object[]
}

export async function getDefaultTemplate(
  payload: Payload,
  pageType: TemplatePageType,
): Promise<TemplateTab> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await payload.findGlobal({ slug: 'default-templates' as any })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tab = (doc as any)[pageType]
  return tab ?? { hero: [], sections: [] }
}

export const getCachedDefaultTemplate = (pageType: TemplatePageType) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      return getDefaultTemplate(payload, pageType)
    },
    [`global_default-templates_${pageType}`],
    {
      tags: [generateCacheTag({ type: 'global', slug: 'default-templates' })],
    },
  )()
