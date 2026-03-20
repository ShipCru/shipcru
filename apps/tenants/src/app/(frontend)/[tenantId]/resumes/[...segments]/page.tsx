import type { VariationInput } from '@/lib/resume-pages/types'
import type { Metadata } from 'next'

import { notFound, permanentRedirect, redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'
import config from '@payload-config'

import { getCachedVariationSets } from '@/collections/ContentVariations/queries/getVariationSets'
import { getCachedTenantPageConfig } from '@/collections/TenantPageConfigs/queries/getTenantPageConfig'
import { getCachedWordFormSets } from '@/collections/WordFormSets/queries/getWordFormSets'
import { getCachedDefaultTemplate } from '@/globals/DefaultTemplates/queries/getDefaultTemplate'
import {
  buildTemplateWordPools,
  getCachedSuffixWords,
} from '@/globals/SuffixVariations/queries/getSuffixWords'
import { buildOverrideChain } from '@/lib/resume-pages/buildOverrideChain'
import { applyOverrides, filterByDataDependencies } from '@/lib/resume-pages/mergeTemplate'
import { normalizeBlock } from '@/lib/resume-pages/normalizeBlock'
import { buildJobTitleSuffixPath, parseResumeUrl } from '@/lib/resume-pages/parseResumeUrl'
import { resolveCanonicalSuffix } from '@/lib/resume-pages/resolveCanonicalSuffix'
import { validateEntity } from '@/lib/resume-pages/validateEntity'
import { buildSubstitutionContext } from '@/lib/shared/buildSubstitutionContext'
import { RenderedPage } from '@/lib/shared/RenderedPage'
import { renderTemplate } from '@/lib/shared/renderTemplate'
import { checkPageAccess } from '@/lib/tenant-visibility'
import { resolveTenantBySlug } from '@/utils/resolveTenant'

export const revalidate = 86400 // 24h

export async function generateStaticParams(): Promise<{ tenantId: string; segments: string[] }[]> {
  return []
}

interface PageProps {
  params: Promise<{ tenantId: string; segments: string[] }>
}

export default async function ResumePage({ params }: PageProps) {
  const { tenantId: tenantSlug, segments } = await params
  const path = `/resumes/${segments.join('/')}`
  const payload = await getPayload({ config })

  const tenant = await resolveTenantBySlug(payload, tenantSlug)
  if (!tenant) return notFound()

  const suffixWords = await getCachedSuffixWords()

  const pools = buildTemplateWordPools(suffixWords)
  const parsed = parseResumeUrl(path, pools)
  if (!parsed) return notFound()

  const entity = await validateEntity(payload, parsed)
  if (!entity) return notFound()

  const pageConfig = await getCachedTenantPageConfig(tenant.id)
  if (!checkPageAccess(pageConfig, parsed, entity)) return notFound()

  if (parsed.type === 'job-title') {
    const canonicalSuffix = await resolveCanonicalSuffix(payload, entity, suffixWords)

    if (canonicalSuffix) {
      const isCanonicalUrl =
        parsed.adjective === canonicalSuffix.adjective &&
        parsed.builder === canonicalSuffix.builder &&
        parsed.content === canonicalSuffix.contentWord

      if (!isCanonicalUrl && canonicalSuffix.strategy.startsWith('redirect-')) {
        const canonicalPath = buildJobTitleSuffixPath(
          tenantSlug,
          parsed.industrySlug,
          parsed.jobTitleSlug!,
          canonicalSuffix,
        )
        if (canonicalSuffix.strategy === 'redirect-301') {
          permanentRedirect(canonicalPath)
        } else {
          redirect(canonicalPath)
        }
      }
    }
  }

  const [defaultTemplate, overrideChain, variationSets, wordFormSets] = await Promise.all([
    getCachedDefaultTemplate(parsed.type === 'industry' ? 'industry' : 'jobTitle'),
    buildOverrideChain(payload, {
      entityType: parsed.type,
      entityId: entity.id,
      categoryId: entity.categoryId,
      industryId: parsed.type === 'job-title' ? entity.industryId : null,
      tenantId: tenant.id,
    }),
    getCachedVariationSets(),
    getCachedWordFormSets(),
  ])

  // Normalize and apply overrides
  const hero = defaultTemplate.hero?.[0] ? normalizeBlock(defaultTemplate.hero[0]) : null
  const baseSections = (defaultTemplate.sections || []).map(normalizeBlock)
  const mergedSections = applyOverrides(baseSections, overrideChain)
  const mergedHero = hero ? (applyOverrides([hero], overrideChain)[0] ?? null) : null
  const filteredSections = filterByDataDependencies(mergedSections, { skills: entity.skills })

  // Build contexts and render
  const contentSeed = parsed.contentSeed || parsed.industrySlug
  const baseSlug = parsed.jobTitleSlug || parsed.industrySlug

  const subCtx = buildSubstitutionContext({
    kind: 'resume',
    tenant,
    parsed,
    entity,
    wordFormSets,
    contentSeed,
    industrySlug: parsed.industrySlug,
    jobTitleSlug: parsed.jobTitleSlug,
    pageType: parsed.type,
  })

  const variationCtx: VariationInput = {
    tenantSlug: tenant.slug,
    contentSeed,
    variationSets,
    entitySkills: entity.skills,
  }

  const page = renderTemplate(mergedHero, filteredSections, variationCtx, subCtx, baseSlug)
  return <RenderedPage page={page} />
}

// --- SEO Metadata ---

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tenantId: tenantSlug, segments } = await params
  const payload = await getPayload({ config })

  const tenant = await resolveTenantBySlug(payload, tenantSlug)
  if (!tenant) return {}

  const suffixWords = await getCachedSuffixWords()
  const path = `/resumes/${segments.join('/')}`
  const parsed = parseResumeUrl(path, buildTemplateWordPools(suffixWords))
  if (!parsed) return {}

  const entity = await validateEntity(payload, parsed)
  if (!entity) return {}

  const title =
    entity.meta?.title ||
    (entity.jobTitleName
      ? `${entity.jobTitleName} Resume - ${entity.industryName}`
      : `${entity.industryName} Resumes`)

  const description =
    entity.meta?.description ||
    (entity.jobTitleName
      ? `Create a professional ${entity.jobTitleName} resume for the ${entity.industryName} industry.`
      : `Browse ${entity.industryName} resume templates and examples.`)

  let canonicalUrl: string | undefined
  if (parsed.type === 'job-title') {
    const canonicalSuffix = await resolveCanonicalSuffix(payload, entity, suffixWords)

    if (canonicalSuffix) {
      const isCanonicalUrl =
        parsed.adjective === canonicalSuffix.adjective &&
        parsed.builder === canonicalSuffix.builder &&
        parsed.content === canonicalSuffix.contentWord

      if (!isCanonicalUrl && canonicalSuffix.strategy === 'rel-canonical') {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''
        canonicalUrl = `${serverUrl}${buildJobTitleSuffixPath(tenantSlug, parsed.industrySlug, parsed.jobTitleSlug!, canonicalSuffix)}`
      }
    }
  }

  return {
    title,
    description,
    robots: entity.meta?.robots === 'noindex' ? { index: false, follow: false } : undefined,
    ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  }
}
