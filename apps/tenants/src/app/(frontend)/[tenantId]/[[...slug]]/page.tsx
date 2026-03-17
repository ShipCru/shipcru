import type { SectionConfig, SubstitutionContext, VariationInput } from '@/lib/resume-pages/types'
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
import { normalizeBlock } from '@/lib/resume-pages/normalizeBlock'
import { orderSections } from '@/lib/resume-pages/orderSections'
import {
  resolveVariationsInSection,
  sectionToBlock,
  substituteSection,
} from '@/lib/resume-pages/renderHelpers'
import { resolveAllWordForms } from '@/lib/resume-pages/resolveWordForms'
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
    return renderKeywordLanding(tenant, slug[0])
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

async function renderKeywordLanding(tenant: ResolvedTenant, keywordSlug: string) {
  const pools = await getCachedSuffixWords()

  const parsed = parseKeywordSlug(keywordSlug, pools)
  if (!parsed) return notFound()

  const pageConfig = await getCachedTenantPageConfig(tenant.id)
  if (!pageConfig) return notFound()

  const keywordConfig = pageConfig.keywordLandings ?? {
    enabled: false,
    mode: 'all' as const,
    patterns: [],
  }
  if (!checkKeywordAccess(keywordSlug, keywordConfig)) return notFound()

  // Load template and supporting data in parallel
  const [templateData, variationSets, wordFormSets] = await Promise.all([
    getCachedDefaultTemplate('keyword'),
    getCachedVariationSets(),
    getCachedWordFormSets(),
  ])

  // Normalize template blocks
  const heroBlock = templateData.hero?.[0] ? normalizeBlock(templateData.hero[0]) : null
  let sections: SectionConfig[] = (templateData.sections ?? []).map(normalizeBlock)

  // Resolve word forms
  const { resumeWords, verbForms, adjectiveForms, contentWordForms } = resolveAllWordForms(
    wordFormSets,
    {
      resumeWord: parsed.resumeWord,
      builder: parsed.builder,
      adjective: parsed.adjective,
      contentWord: parsed.contentWord,
    },
    tenant.id,
  )

  // Resolve variations
  const variationCtx: VariationInput = {
    tenantSlug: tenant.slug,
    contentSeed: keywordSlug,
    variationSets,
    entitySkills: [],
  }

  sections = sections.map((section) => resolveVariationsInSection(section, variationCtx))

  // Build substitution context
  const subCtx: SubstitutionContext = {
    adjective: parsed.adjective ?? '',
    builder: parsed.builder ?? '',
    content: parsed.contentWord ?? '',
    skills: [],
    skillSeed: keywordSlug,
    industryName: '',
    jobTitleName: '',
    brandTitle: tenant.name,
    resumeWords,
    verbForms,
    adjectiveForms,
    contentWordForms,
    pageTerms: {
      pageTerm: keywordSlug,
      iSlug: '',
      jSlug: '',
    },
    pageData: {},
  }

  sections = sections.map((section) => substituteSection(section, subCtx))
  sections = orderSections({ sections, baseSlug: keywordSlug })

  return (
    <article>
      {heroBlock && <RenderHero blocks={[sectionToBlock(heroBlock)]} />}
      <RenderBlocks blocks={sections.map(sectionToBlock)} />
    </article>
  )
}

export async function generateStaticParams(): Promise<{ tenantId: string; slug?: string[] }[]> {
  return []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // TODO: generate metadata for keyword landings and pages
  return {}
}
