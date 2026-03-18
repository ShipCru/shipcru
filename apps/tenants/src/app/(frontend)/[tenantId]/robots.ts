import type { MetadataRoute } from 'next'

import { resolveSitemapTenantContext } from '@/lib/sitemaps/resolveBaseUrl'

export const revalidate = 86400

export default async function robots(): Promise<MetadataRoute.Robots> {
  const ctx = await resolveSitemapTenantContext()
  if (!ctx) {
    return { rules: { userAgent: '*', allow: '/' } }
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${ctx.baseUrl}/sitemap.xml`,
  }
}
