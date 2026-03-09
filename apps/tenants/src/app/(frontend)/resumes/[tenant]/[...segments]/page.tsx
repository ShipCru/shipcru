import type {
  SectionConfig,
  SubstitutionContext,
  VariationFieldValue,
  VariationInput,
} from '@/lib/resume-pages/types'
import type { Metadata } from 'next'

import { notFound } from 'next/navigation'
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
import { parseResumeUrl } from '@/lib/resume-pages/parseResumeUrl'
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

export const revalidate = 24 * 60 * 60

interface PageProps {
  params: Promise<{ tenant: string; segments: string[] }>
}

export default async function ResumePage({ params }: PageProps) {
  const { tenant: tenantSlug, segments } = await params
  const payload = await getPayload({ config })

  const tenant = await resolveTenantBySlug(payload, tenantSlug)
  if (!tenant) return notFound()

  const suffixWords = await getCachedSuffixWords()

  const path = `/resumes/${segments.join('/')}`
  const parsed = parseResumeUrl(path, suffixWords)
  if (!parsed) return notFound()

  const entity = await validateEntity(payload, parsed)
  if (!entity) return notFound()

  const canServe = await checkTenantPageConfig(payload, tenant.id, parsed, entity)
  if (!canServe) return notFound()

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

  // Normalize template into SectionConfig objects
  const hero = defaultTemplate.hero?.[0] ? normalizeBlock(defaultTemplate.hero[0]) : null
  const baseSections = (defaultTemplate.sections || []).map(normalizeBlock)

  // Apply overrides
  const mergedSections = applyOverrides(baseSections, overrideChain)
  const mergedHero = hero ? (applyOverrides([hero], overrideChain)[0] ?? null) : null

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
  const payload = await getPayload({ config })

  const tenant = await resolveTenantBySlug(payload, tenantSlug)
  if (!tenant) return {}

  const suffixWords = await getCachedSuffixWords()
  const path = `/resumes/${segments.join('/')}`
  const parsed = parseResumeUrl(path, suffixWords)
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

  return {
    title,
    description,
    robots: entity.meta?.robots === 'noindex' ? { index: false, follow: false } : undefined,
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
