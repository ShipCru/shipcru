import type { Metadata } from 'next'

import type { Media, Page } from '@/payload-types'

import { getServerSideURL } from './getURL'
import { mergeOpenGraph } from './mergeOpenGraph'

export function generateMeta({ doc }: { doc: Partial<Page> | null }): Metadata {
  // meta fields are loosely typed since SEO plugin types aren't regenerated yet
  const meta = (doc as Record<string, any>)?.meta as Record<string, any> | undefined

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
