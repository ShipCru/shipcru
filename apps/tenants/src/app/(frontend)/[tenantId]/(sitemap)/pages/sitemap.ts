import type { MetadataRoute } from 'next'

import { resolveSitemapTenantContext } from '@/lib/sitemaps/resolveBaseUrl'

export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ctx = await resolveSitemapTenantContext()
  if (!ctx) return []

  const { payload, tenant, baseUrl } = ctx

  const result = await payload.find({
    collection: 'pages',
    where: {
      and: [{ tenant: { equals: tenant.id } }, { _status: { equals: 'published' } }],
    },
    depth: 0,
    pagination: false,
    select: { breadcrumbs: true, updatedAt: true },
  })

  return result.docs.flatMap((doc) => {
    const breadcrumbs = doc.breadcrumbs as Array<{ url?: string | null }> | undefined
    if (!breadcrumbs?.length) return []

    const url = breadcrumbs[breadcrumbs.length - 1]?.url
    if (!url) return []

    return [
      {
        url: `${baseUrl}${url === '/' ? '' : url}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: url === '/' ? 1.0 : 0.8,
      },
    ]
  })
}
