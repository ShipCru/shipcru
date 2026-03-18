import type { MetadataRoute } from 'next'

import { getCachedTenantPageConfig } from '@/collections/TenantPageConfigs/queries/getTenantPageConfig'
import { getCachedSuffixWords } from '@/globals/SuffixVariations/queries/getSuffixWords'
import { checkKeywordAccess } from '@/lib/keyword-landings/checkKeywordAccess'
import { generateKeywordCombinations } from '@/lib/keyword-landings/generateCombinations'
import { resolveSitemapTenantContext } from '@/lib/sitemaps/resolveBaseUrl'

export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ctx = await resolveSitemapTenantContext()
  if (!ctx) return []

  const { tenant, baseUrl } = ctx
  const pageConfig = await getCachedTenantPageConfig(tenant.id)

  const keywordConfig = pageConfig?.keywordLandings ?? {
    enabled: false,
    mode: 'all' as const,
    patterns: [],
  }
  if (!keywordConfig.enabled) return []

  const pools = await getCachedSuffixWords()
  const allSlugs = generateKeywordCombinations(pools)
  const allowedSlugs = allSlugs.filter((slug) => checkKeywordAccess(slug, keywordConfig))

  return allowedSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
}
