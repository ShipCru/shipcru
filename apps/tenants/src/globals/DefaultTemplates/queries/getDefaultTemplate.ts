import type { Payload } from 'payload'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { DefaultTemplate } from '@/payload-types'
import { generateCacheTag } from '@/utilities/generateCacheTag'

export type TemplatePageType = 'jobTitle' | 'industry' | 'keyword'

export async function getDefaultTemplate<T extends TemplatePageType>(
  payload: Payload,
  pageType: T,
) {
  const doc = await payload.findGlobal({ slug: 'default-templates' })
  const tab = doc[pageType]

  return tab ?? ({ hero: [], sections: [] } as NonNullable<DefaultTemplate[T]>)
}

export const getCachedDefaultTemplate = <T extends TemplatePageType>(pageType: T) =>
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
