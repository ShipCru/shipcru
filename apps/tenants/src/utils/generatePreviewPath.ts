import type { CollectionSlug, PayloadRequest } from 'payload'

type Props = {
  collection: Extract<CollectionSlug, 'pages' | 'industries' | 'job-titles'>
  slug: string
  path: string
  req: PayloadRequest
  tenantSlug?: string
}

export const generatePreviewPath = ({ collection, slug, path, tenantSlug }: Props) => {
  const params: Record<string, string> = {
    slug,
    collection,
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  }

  if (tenantSlug) {
    params.tenantSlug = tenantSlug
  }

  const url = `/next/preview?${new URLSearchParams(params).toString()}`

  return url
}
