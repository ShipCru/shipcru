import type { SectionConfig, VariationInput } from '@/lib/resume-pages/types'
import type { Page } from '@/payload-types'
import type { ResolvedTenant } from '@/utils/resolveTenant'
import type { Metadata } from 'next'
import type { Payload } from 'payload'

import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'
import config from '@payload-config'

import { RenderBlocks, RenderHero } from '@/blocks/RenderBlocks'
import { getCachedVariationSets } from '@/collections/ContentVariations/queries/getVariationSets'
import { findPageByBreadcrumbUrl } from '@/collections/Pages/queries/findPageByBreadcrumbUrl'
import { getCachedTenantPageConfig } from '@/collections/TenantPageConfigs/queries/getTenantPageConfig'
import { getCachedWordFormSets } from '@/collections/WordFormSets/queries/getWordFormSets'
import { getCachedDefaultTemplate } from '@/globals/DefaultTemplates/queries/getDefaultTemplate'
import { getCachedSuffixWords } from '@/globals/SuffixVariations/queries/getSuffixWords'
import { checkKeywordAccess } from '@/lib/keyword-landings/checkKeywordAccess'
import { parseKeywordSlug } from '@/lib/keyword-landings/parseKeywordSlug'
import { buildOverrideChain } from '@/lib/resume-pages/buildOverrideChain'
import { applyOverrides } from '@/lib/resume-pages/mergeTemplate'
import { normalizeBlock } from '@/lib/resume-pages/normalizeBlock'
import { buildSubstitutionContext } from '@/lib/shared/buildSubstitutionContext'
import { RenderedPage } from '@/lib/shared/RenderedPage'
import { renderTemplate } from '@/lib/shared/renderTemplate'
import { resolveTenantBySlug } from '@/utils/resolveTenant'

export const revalidate = 86400

interface PageProps {
  params: Promise<{ tenantId: string; slug?: string[] }>
}

export default async function CatchAllPage({ params }: PageProps) {
  const { tenantId, slug } = await params
  const payload = await getPayload({ config })

  const tenant = await resolveTenantBySlug(payload, tenantId)
  if (!tenant) return notFound()

  const slugPath = slug?.join('/') ?? ''

  // Home page or Pages collection entry
  const page = await findPageByBreadcrumbUrl(tenant.id, slugPath || '/')
  if (page) return renderPage(page)

  // No slug = home page not found
  if (!slugPath) return notFound()

  // Single segment → try keyword landing
  if (slug && slug.length === 1) {
    return renderKeywordLanding(payload, tenant, slug[0])
  }

  return notFound()
}

// --- Pages rendering ---

function renderPage(page: Page) {
  return (
    <article>
      {page.hero && <RenderHero blocks={page.hero} />}
      {page.layout && <RenderBlocks blocks={page.layout} />}
    </article>
  )
}

// --- Keyword landing rendering ---

async function renderKeywordLanding(payload: Payload, tenant: ResolvedTenant, keywordSlug: string) {
  const pools = await getCachedSuffixWords()

  const parsed = parseKeywordSlug(keywordSlug, pools)
  if (!parsed) return notFound()

  // Fill missing parts from canonical suffixes for template rendering
  const resolvedParsed = {
    adjective: parsed.adjective ?? pools.canonicalAdjective,
    resumeWord: parsed.resumeWord,
    builder: parsed.builder ?? pools.canonicalBuilder,
    contentWord: parsed.contentWord ?? pools.canonicalContentWord,
  }

  const pageConfig = await getCachedTenantPageConfig(tenant.id)
  if (!pageConfig) return notFound()

  const keywordConfig = pageConfig.keywordLandings ?? {
    enabled: false,
    mode: 'all' as const,
    patterns: [],
  }
  if (!checkKeywordAccess(keywordSlug, keywordConfig)) return notFound()

  // Load template and supporting data in parallel
  const [templateData, overrideChain, variationSets, wordFormSets] = await Promise.all([
    getCachedDefaultTemplate('keyword'),
    buildOverrideChain(payload, {
      entityType: 'keyword-landing',
      keywordSlug: keywordSlug,
      tenantId: tenant.id,
    }),
    getCachedVariationSets(),
    getCachedWordFormSets(),
  ])

  // Normalize and apply overrides
  const heroBlock = templateData.hero?.[0] ? normalizeBlock(templateData.hero[0]) : null
  const sections: SectionConfig[] = (templateData.sections ?? []).map(normalizeBlock)
  const mergedSections = applyOverrides(sections, overrideChain)
  const mergedHero = heroBlock ? (applyOverrides([heroBlock], overrideChain)[0] ?? null) : null

  const subCtx = buildSubstitutionContext({
    kind: 'keyword',
    tenant,
    parsed: resolvedParsed,
    wordFormSets,
    contentSeed: keywordSlug,
  })

  const variationCtx: VariationInput = {
    tenantSlug: tenant.slug,
    contentSeed: keywordSlug,
    variationSets,
    entitySkills: [],
  }

  const page = renderTemplate(mergedHero, mergedSections, variationCtx, subCtx, keywordSlug)
  return <RenderedPage page={page} />
}

export async function generateStaticParams(): Promise<{ tenantId: string; slug?: string[] }[]> {
  return []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // TODO: generate metadata for keyword landings and pages
  return {}
}
