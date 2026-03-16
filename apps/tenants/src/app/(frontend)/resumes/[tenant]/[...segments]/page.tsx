import type {
  SectionConfig,
  SubstitutionContext,
  VariationFieldValue,
  VariationInput,
} from '@/lib/resume-pages/types'
import type { Metadata } from 'next'

import { notFound, permanentRedirect, redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'
import config from '@payload-config'

import { type Block, RenderBlocks, RenderHero } from '@/blocks/RenderBlocks'
import { getCachedVariationSets } from '@/collections/ContentVariations/queries/getVariationSets'
import { getCachedWordFormSets } from '@/collections/WordFormSets/queries/getWordFormSets'
import { getCachedDefaultTemplate as getCachedIndustryTemplate } from '@/globals/DefaultIndustryTemplate/queries/getDefaultTemplate'
import { getCachedDefaultTemplate as getCachedJobTitleTemplate } from '@/globals/DefaultJobTitleTemplate/queries/getDefaultTemplate'
import { getCachedSuffixWords } from '@/globals/SuffixVariations/queries/getSuffixWords'
import { buildOverrideChain } from '@/lib/resume-pages/buildOverrideChain'
import { checkTenantPageConfig } from '@/lib/resume-pages/checkTenantPageConfig'
import { applyOverrides, filterByDataDependencies } from '@/lib/resume-pages/mergeTemplate'
import { normalizeBlock } from '@/lib/resume-pages/normalizeBlock'
import { orderSections } from '@/lib/resume-pages/orderSections'
import { buildJobTitleSuffixPath, parseResumeUrl } from '@/lib/resume-pages/parseResumeUrl'
import { resolveCanonicalSuffix } from '@/lib/resume-pages/resolveCanonicalSuffix'
import { resolveVariationField } from '@/lib/resume-pages/resolveVariations'
import {
  resolveAdjectiveForms,
  resolveContentWordForms,
  resolveResumeWords,
  resolveVerbForms,
} from '@/lib/resume-pages/resolveWordForms'
import { substituteVariables } from '@/lib/resume-pages/substituteVariables'
import { validateEntity } from '@/lib/resume-pages/validateEntity'
import { resolveTenantBySlug } from '@/utils/resolveTenant'

export const revalidate = 86400 // 24h

export async function generateStaticParams(): Promise<{ tenant: string; segments: string[] }[]> {
  return []
}

interface PageProps {
  params: Promise<{ tenant: string; segments: string[] }>
}

export default async function ResumePage({ params }: PageProps) {
  const { tenant: tenantSlug, segments } = await params
  const path = `/resumes/${segments.join('/')}`

  console.log(
    `[ResumePage] start: tenantSlug=${tenantSlug} segments=${JSON.stringify(segments)} path=${path}`,
  )

  const payload = await getPayload({ config })

  const tenant = await resolveTenantBySlug(payload, tenantSlug)
  if (!tenant) {
    console.log(`[ResumePage] tenant not found for slug: ${tenantSlug}`)
    return notFound()
  }
  console.log(
    `[ResumePage] tenant resolved: id=${tenant.id} slug=${tenant.slug} name=${tenant.name}`,
  )

  const suffixWords = await getCachedSuffixWords()
  console.log(
    `[ResumePage] suffixWords loaded: adjectives=${suffixWords.adjectives.length} builders=${suffixWords.builders.length} contentWords=${suffixWords.contentWords.length}`,
  )

  const parsed = parseResumeUrl(path, suffixWords)
  if (!parsed) {
    console.log(`[ResumePage] parseResumeUrl returned null for path: ${path}`)
    return notFound()
  }
  console.log(
    `[ResumePage] parsed URL: type=${parsed.type} industrySlug=${parsed.industrySlug} jobTitleSlug=${parsed.jobTitleSlug || '<none>'} builder=${parsed.builder || '<none>'} adjective=${parsed.adjective || '<none>'} content=${parsed.content || '<none>'}`,
  )

  const entity = await validateEntity(payload, parsed)
  if (!entity) {
    console.log(
      `[ResumePage] entity validation failed for: type=${parsed.type} industrySlug=${parsed.industrySlug} jobTitleSlug=${parsed.jobTitleSlug || '<none>'}`,
    )
    return notFound()
  }
  console.log(
    `[ResumePage] entity validated: id=${entity.id} industryName=${entity.industryName} jobTitleName=${entity.jobTitleName || '<none>'} skills=${entity.skills?.length || 0}`,
  )

  const canServe = await checkTenantPageConfig(payload, tenant.id, parsed, entity)
  if (!canServe) {
    console.log(
      `[ResumePage] checkTenantPageConfig denied: tenantId=${tenant.id} entityId=${entity.id}`,
    )
    return notFound()
  }
  console.log(`[ResumePage] tenant page config OK`)

  // Canonical suffix resolution (job-title pages only)
  if (parsed.type === 'job-title') {
    const canonicalSuffix = await resolveCanonicalSuffix(payload, entity, suffixWords)

    if (canonicalSuffix) {
      const isCanonicalUrl =
        parsed.adjective === canonicalSuffix.adjective &&
        parsed.builder === canonicalSuffix.builder &&
        parsed.content === canonicalSuffix.contentWord

      if (!isCanonicalUrl && canonicalSuffix.strategy.startsWith('redirect-')) {
        const canonicalPath = buildJobTitleSuffixPath(tenantSlug, parsed.industrySlug, parsed.jobTitleSlug!, canonicalSuffix)
        if (canonicalSuffix.strategy === 'redirect-301') {
          permanentRedirect(canonicalPath)
        } else {
          redirect(canonicalPath)
        }
      }
    }
  }

  const getCachedTemplate =
    parsed.type === 'industry' ? getCachedIndustryTemplate : getCachedJobTitleTemplate

  const [defaultTemplate, overrideChain, variationSets, wordFormSets] = await Promise.all([
    getCachedTemplate(),
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

  console.log(
    `[ResumePage] template loaded: hero=${defaultTemplate.hero?.length || 0} sections=${defaultTemplate.sections?.length || 0}`,
  )
  console.log(`[ResumePage] overrideChain: ${overrideChain.length} overrides`)
  console.log(
    `[ResumePage] variationSets: ${variationSets.length}, wordFormSets: ${wordFormSets.length}`,
  )

  // Normalize template into SectionConfig objects
  const hero = defaultTemplate.hero?.[0] ? normalizeBlock(defaultTemplate.hero[0]) : null
  const baseSections = (defaultTemplate.sections || []).map(normalizeBlock)

  // Apply overrides
  const mergedSections = applyOverrides(baseSections, overrideChain)
  const mergedHero = hero ? (applyOverrides([hero], overrideChain)[0] ?? null) : null

  console.log(
    `[ResumePage] after merge: hero=${mergedHero ? 'yes' : 'no'} sections=${mergedSections.length}`,
  )

  // Filter by data dependencies
  const filteredSections = filterByDataDependencies(mergedSections, {
    skills: entity.skills,
  })

  // Resolve variations
  const variationCtx: VariationInput = {
    tenantSlug: tenant.slug,
    contentSeed: parsed.contentSeed || parsed.industrySlug,
    variationSets,
    entitySkills: entity.skills,
  }

  const resolvedHero = mergedHero ? resolveVariationsInSection(mergedHero, variationCtx) : null
  const resolvedSections = filteredSections.map((section) =>
    resolveVariationsInSection(section, variationCtx),
  )

  // Substitute template variables
  const substitutionContext: SubstitutionContext = {
    adjective: parsed.adjective,
    builder: parsed.builder,
    content: parsed.content,
    skills: entity.skills,
    skillSeed: `${tenant.slug}.${parsed.contentSeed || parsed.industrySlug}.skills`,
    industryName: entity.industryName,
    jobTitleName: entity.jobTitleName,
    brandTitle: process.env.NEXT_PUBLIC_BRAND_TITLE || tenant.name,
    resumeWords: resolveResumeWords(wordFormSets, 'resume', tenant.id),
    verbForms: resolveVerbForms(wordFormSets, parsed.builder || '', tenant.id),
    adjectiveForms: resolveAdjectiveForms(wordFormSets, parsed.adjective || '', tenant.id),
    contentWordForms: resolveContentWordForms(wordFormSets, parsed.content || '', tenant.id),
    pageTerms: {
      pageTerm: parsed.type === 'job-title' ? entity.jobTitleName || '' : entity.industryName || '',
      iSlug: parsed.industrySlug,
      jSlug: parsed.jobTitleSlug || '',
    },
    pageData: {
      industry: { name: entity.industryName, slug: parsed.industrySlug },
      ...(parsed.type === 'job-title' && entity.jobTitleName
        ? { jobTitle: { name: entity.jobTitleName, slug: parsed.jobTitleSlug } }
        : {}),
    },
  }

  const substitutedHero = resolvedHero ? substituteSection(resolvedHero, substitutionContext) : null
  const substitutedSections = resolvedSections.map((section) =>
    substituteSection(section, substitutionContext),
  )

  // Order sections
  const baseSlug = parsed.jobTitleSlug || parsed.industrySlug
  const ordered = orderSections({ sections: substitutedSections, baseSlug })

  console.log(
    `[ResumePage] rendering: hero=${substitutedHero ? substitutedHero.blockType : 'none'} sections=${ordered.map((s) => s.blockType).join(',')}`,
  )

  return (
    <article>
      {substitutedHero && <RenderHero blocks={[sectionToBlock(substitutedHero)]} />}
      <RenderBlocks blocks={ordered.map(sectionToBlock)} />
    </article>
  )
}

// --- SEO Metadata ---

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tenant: tenantSlug, segments } = await params
  console.log(
    `[generateMetadata] start: tenantSlug=${tenantSlug} segments=${JSON.stringify(segments)}`,
  )

  const payload = await getPayload({ config })

  const tenant = await resolveTenantBySlug(payload, tenantSlug)
  if (!tenant) {
    console.log(`[generateMetadata] tenant not found: ${tenantSlug}`)
    return {}
  }

  const suffixWords = await getCachedSuffixWords()
  const path = `/resumes/${segments.join('/')}`
  const parsed = parseResumeUrl(path, suffixWords)
  if (!parsed) {
    console.log(`[generateMetadata] parse failed for path: ${path}`)
    return {}
  }

  const entity = await validateEntity(payload, parsed)
  if (!entity) {
    console.log(
      `[generateMetadata] entity validation failed: ${parsed.type} ${parsed.industrySlug}`,
    )
    return {}
  }

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

function sectionToBlock(section: SectionConfig): Block {
  return { blockType: section.blockType, ...section.fields } as Block
}

function isVariationFieldValue(value: unknown): value is VariationFieldValue {
  if (typeof value !== 'object' || value === null || !('mode' in value)) return false
  const { mode } = value as Record<string, unknown>
  return mode === 'fixed' || mode === 'variation'
}

function resolveVariationsInSection(section: SectionConfig, ctx: VariationInput): SectionConfig {
  return {
    ...section,
    fields: resolveFieldValues(section.fields, ctx),
  }
}

function resolveFieldValues(
  fields: Record<string, unknown>,
  ctx: VariationInput,
): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(fields)) {
    if (isVariationFieldValue(value)) {
      result[key] = resolveVariationField(value, ctx)
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === 'object' && item !== null && !Array.isArray(item)
          ? isVariationFieldValue(item)
            ? resolveVariationField(item, ctx)
            : resolveFieldValues(item as Record<string, unknown>, ctx)
          : item,
      )
    } else if (typeof value === 'object' && value !== null) {
      result[key] = resolveFieldValues(value as Record<string, unknown>, ctx)
    } else {
      result[key] = value
    }
  }
  return result
}

function substituteSection(
  section: SectionConfig,
  ctx: Parameters<typeof substituteVariables>[1],
): SectionConfig {
  return {
    ...section,
    fields: substituteFieldValues(section.fields, ctx),
  }
}

function substituteFieldValues(
  fields: Record<string, unknown>,
  ctx: Parameters<typeof substituteVariables>[1],
): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(fields)) {
    if (typeof value === 'string') {
      result[key] = substituteVariables(value, ctx)
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === 'object' && item !== null
          ? substituteFieldValues(item as Record<string, unknown>, ctx)
          : typeof item === 'string'
            ? substituteVariables(item, ctx)
            : item,
      )
    } else if (typeof value === 'object' && value !== null) {
      result[key] = substituteFieldValues(value as Record<string, unknown>, ctx)
    } else {
      result[key] = value
    }
  }
  return result
}
