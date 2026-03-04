import type { Media, Page } from '@/payload-types'
import type { Metadata } from 'next'

import { getServerSideURL } from './getURL'
import { mergeOpenGraph } from './mergeOpenGraph'

export function generateMeta({ doc }: { doc: Partial<Page> | null }): Metadata {
  const meta = doc.meta

  const ogImage =
    meta?.image && typeof meta.image === 'object' && 'url' in meta.image
      ? `${getServerSideURL()}${(meta.image as Media).url}`
      : undefined

  const title = meta?.title || doc?.title || ''
  const description = meta?.description || ''

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    }),
  }
}
