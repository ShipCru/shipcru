import type { MetadataRoute } from 'next'

import { getPayload } from 'payload'
import config from '@payload-config'

import { getCachedTenantPageConfig } from '@/collections/TenantPageConfigs/queries/getTenantPageConfig'
import { getCachedSuffixWords } from '@/globals/SuffixVariations/queries/getSuffixWords'
import { checkKeywordAccess } from '@/lib/keyword-landings/checkKeywordAccess'
import { generateKeywordCombinations } from '@/lib/keyword-landings/generateCombinations'
import { resolveTenantBySlug } from '@/utils/resolveTenant'

export const revalidate = 86400

export default async function sitemap({
  params,
}: {
  params: Promise<{ tenantId: string }>
}): Promise<MetadataRoute.Sitemap> {
  const { tenantId } = await params
  const payload = await getPayload({ config })

  const tenant = await resolveTenantBySlug(payload, tenantId)
  if (!tenant) return []

  const pageConfig = await getCachedTenantPageConfig(tenant.id)

  const keywordConfig = pageConfig?.keywordLandings ?? {
    enabled: false,
    mode: 'all' as const,
    patterns: [],
  }

  if (!keywordConfig.enabled) return []

  // Generate all combinations and filter by tenant access
  const pools = await getCachedSuffixWords()
  const allSlugs = generateKeywordCombinations(pools)
  const allowedSlugs = allSlugs.filter((slug) => checkKeywordAccess(slug, keywordConfig))

  // Resolve base URL from tenant domain or fallback
  const baseUrl = tenant.domain ? `https://${tenant.domain}` : `https://example.com/${tenantId}`

  return allowedSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
}
