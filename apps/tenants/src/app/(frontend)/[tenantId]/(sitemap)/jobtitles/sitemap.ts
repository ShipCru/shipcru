import type { MetadataRoute } from 'next'

import { getCachedTenantPageConfig } from '@/collections/TenantPageConfigs/queries/getTenantPageConfig'
import { getCachedSuffixWords } from '@/globals/SuffixVariations/queries/getSuffixWords'
import { resolveCanonicalSuffix } from '@/lib/resume-pages/resolveCanonicalSuffix'
import { resolveSitemapTenantContext } from '@/lib/sitemaps/resolveBaseUrl'
import { buildIndustryWhere, buildJobTitleWhere } from '@/lib/tenant-visibility'

export const revalidate = 86400

const CHUNK_SIZE = 15_000

export async function generateSitemaps() {
  const ctx = await resolveSitemapTenantContext()
  if (!ctx) return [{ id: 0 }]

  const entries = await buildAllEntries(ctx)
  const chunks = Math.max(1, Math.ceil(entries.length / CHUNK_SIZE))

  return Array.from({ length: chunks }, (_, i) => ({ id: i }))
}

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const ctx = await resolveSitemapTenantContext()
  if (!ctx) return []

  const entries = await buildAllEntries(ctx)
  const start = id * CHUNK_SIZE
  return entries.slice(start, start + CHUNK_SIZE)
}

interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: 'weekly'
  priority: number
}

async function buildAllEntries(ctx: {
  tenant: { id: number }
  payload: import('payload').Payload
  baseUrl: string
}): Promise<SitemapEntry[]> {
  const { payload, tenant, baseUrl } = ctx
  const pageConfig = await getCachedTenantPageConfig(tenant.id)
  if (!pageConfig) return []

  const industryWhere = buildIndustryWhere(pageConfig)

  const [industries, suffixWords] = await Promise.all([
    payload.find({
      collection: 'industries',
      where: industryWhere,
      depth: 0,
      pagination: false,
      select: { slug: true },
    }),
    getCachedSuffixWords(),
  ])

  if (industries.docs.length === 0) return []

  const visibleIndustryIds = industries.docs.map((ind) => ind.id)
  const visibleIndustryMap = new Map(
    industries.docs.map((ind) => [ind.id, ind.slug]),
  )

  const jtWhere = buildJobTitleWhere(pageConfig, visibleIndustryIds)

  const jobTitles = await payload.find({
    collection: 'job-titles',
    where: jtWhere,
    depth: 0,
    pagination: false,
    select: {
      slug: true,
      industries: true,
      overrideSuffix: true,
      suffixAdjective: true,
      suffixBuilder: true,
      suffixContentWord: true,
      suffixStrategy: true,
      updatedAt: true,
    },
  })

  const globalCanonical =
    suffixWords.canonicalAdjective &&
    suffixWords.canonicalBuilder &&
    suffixWords.canonicalContentWord
      ? {
          adjective: suffixWords.canonicalAdjective,
          resumeWord: suffixWords.canonicalResumeWord ?? 'resume',
          builder: suffixWords.canonicalBuilder,
          contentWord: suffixWords.canonicalContentWord,
        }
      : null

  const entries: SitemapEntry[] = []

  for (const jt of jobTitles.docs) {
    let suffix: {
      adjective: string
      resumeWord: string
      builder: string
      contentWord: string
    } | null

    if (jt.overrideSuffix) {
      const resolved = await resolveCanonicalSuffix(
        payload,
        {
          overrideSuffix: jt.overrideSuffix,
          suffixAdjective: typeof jt.suffixAdjective === 'object' ? jt.suffixAdjective?.id : jt.suffixAdjective,
          suffixBuilder: typeof jt.suffixBuilder === 'object' ? jt.suffixBuilder?.id : jt.suffixBuilder,
          suffixContentWord: typeof jt.suffixContentWord === 'object' ? jt.suffixContentWord?.id : jt.suffixContentWord,
          suffixStrategy: jt.suffixStrategy,
        },
        suffixWords,
      )
      suffix = resolved
    } else {
      suffix = globalCanonical
    }

    if (!suffix) continue

    const jtIndustryIds = (jt.industries ?? []) as number[]
    const suffixStr = `${suffix.adjective}-${suffix.resumeWord}-${suffix.builder}-${suffix.contentWord}`

    for (const indId of jtIndustryIds) {
      const industrySlug = visibleIndustryMap.get(indId)
      if (!industrySlug) continue

      entries.push({
        url: `${baseUrl}/resumes/${industrySlug}/${jt.slug}-${suffixStr}`,
        lastModified: jt.updatedAt ? new Date(jt.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      })
    }
  }

  return entries
}
