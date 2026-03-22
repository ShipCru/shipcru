import type { MetadataRoute } from 'next'

import { getCachedTenantPageConfig } from '@/collections/Tenants/queries/getTenantPageConfig'
import { getCachedDefaultTemplate } from '@/globals/DefaultTemplates/queries/getDefaultTemplate'
import {
  buildCanonicalWordPools,
  getCachedSuffixWords,
} from '@/globals/SuffixVariations/queries/getSuffixWords'
import { checkKeywordAccess } from '@/lib/keyword-landings/checkKeywordAccess'
import { generateTemplateCombinations } from '@/lib/keyword-landings/generateCombinations'
import { DEFAULT_KEYWORD_PATTERNS } from '@/lib/keyword-landings/templatePatterns'
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

  const [suffixData, templateData] = await Promise.all([
    getCachedSuffixWords(),
    getCachedDefaultTemplate('keyword'),
  ])

  const canonicalPools = buildCanonicalWordPools(suffixData)

  const rawPatterns = templateData.patterns
  const patterns = rawPatterns?.length
    ? rawPatterns.map((p) => p.pattern)
    : DEFAULT_KEYWORD_PATTERNS

  const allSlugs = generateTemplateCombinations(patterns, canonicalPools)
  const allowedSlugs = allSlugs.filter((slug) => checkKeywordAccess(slug, keywordConfig))

  return allowedSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
}
