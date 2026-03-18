import type { MetadataRoute } from 'next'

import { getCachedTenantPageConfig } from '@/collections/TenantPageConfigs/queries/getTenantPageConfig'
import { buildIndustryWhere } from '@/lib/tenant-visibility'
import { resolveSitemapTenantContext } from '@/lib/sitemaps/resolveBaseUrl'

export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ctx = await resolveSitemapTenantContext()
  if (!ctx) return []

  const { payload, tenant, baseUrl } = ctx
  const pageConfig = await getCachedTenantPageConfig(tenant.id)
  if (!pageConfig) return []

  const where = buildIndustryWhere(pageConfig)

  const result = await payload.find({
    collection: 'industries',
    where,
    depth: 0,
    pagination: false,
    select: { slug: true, updatedAt: true },
  })

  return result.docs.map((ind) => ({
    url: `${baseUrl}/resumes/${ind.slug}`,
    lastModified: ind.updatedAt ? new Date(ind.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
}
