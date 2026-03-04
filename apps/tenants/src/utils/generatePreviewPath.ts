import type { CollectionSlug, PayloadRequest } from 'payload'

type Props = {
  collection: Extract<CollectionSlug, 'pages' | 'news' | 'locations' | 'events'>
  slug: string
  path: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, path }: Props) => {
  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
