import type { ResolvedTemplateOverride } from './types'
import type { Payload } from 'payload'

import {
  keywordPatternSpecificity,
  matchKeywordPattern,
} from '@/lib/keyword-landings/matchKeywordPattern'
import { TARGET_TYPE_TO_RELATION } from './types'

const ENTITY_TARGET_PRIORITY = ['industry-category', 'industry', 'job-title'] as const

export function sortOverrides(docs: ResolvedTemplateOverride[]): ResolvedTemplateOverride[] {
  return [...docs].sort((a, b) => {
    const aIsTenant = a.tenant != null ? 1 : 0
    const bIsTenant = b.tenant != null ? 1 : 0
    if (aIsTenant !== bIsTenant) return aIsTenant - bIsTenant

    const aIsKeyword = a.targetType === 'keyword-landing' ? 1 : 0
    const bIsKeyword = b.targetType === 'keyword-landing' ? 1 : 0
    if (aIsKeyword !== bIsKeyword) return aIsKeyword - bIsKeyword

    if (a.targetType === 'keyword-landing' && b.targetType === 'keyword-landing') {
      return keywordPatternSpecificity(a.targetPattern) - keywordPatternSpecificity(b.targetPattern)
    }

    const aIdx = ENTITY_TARGET_PRIORITY.indexOf(
      a.targetType as (typeof ENTITY_TARGET_PRIORITY)[number],
    )
    const bIdx = ENTITY_TARGET_PRIORITY.indexOf(
      b.targetType as (typeof ENTITY_TARGET_PRIORITY)[number],
    )
    return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx)
  })
}

// --- Discriminated union params ---

export type OverrideChainParams =
  | {
      entityType: 'industry' | 'job-title'
      entityId: string | number
      categoryId: string | number | null
      industryId: string | number | null
      tenantId: string | number | null
    }
  | {
      entityType: 'keyword-landing'
      keywordSlug: string
      tenantId: string | number | null
    }

export async function buildOverrideChain(
  payload: Payload,
  params: OverrideChainParams,
): Promise<ResolvedTemplateOverride[]> {
  if (params.entityType === 'keyword-landing') {
    return buildKeywordOverrideChain(payload, params)
  }

  return buildEntityOverrideChain(payload, params)
}

// --- Entity override chain (industry / job-title) ---

async function buildEntityOverrideChain(
  payload: Payload,
  params: Extract<OverrideChainParams, { entityType: 'industry' | 'job-title' }>,
): Promise<ResolvedTemplateOverride[]> {
  const { entityType, entityId, categoryId, tenantId } = params

  const scopes: { targetType: string; targetEntity: string | number }[] = []

  if (categoryId) {
    scopes.push({ targetType: 'industry-category', targetEntity: categoryId })
  }

  const effectiveIndustryId = entityType === 'industry' ? entityId : params.industryId
  if (effectiveIndustryId) {
    scopes.push({ targetType: 'industry', targetEntity: effectiveIndustryId })
  }

  if (entityType === 'job-title') {
    scopes.push({ targetType: 'job-title', targetEntity: entityId })
  }

  if (scopes.length === 0) return []

  const tenantConditions: Record<string, unknown>[] = [{ tenant: { exists: false } }]
  if (tenantId) {
    tenantConditions.push({ tenant: { equals: tenantId } })
  }

  const result = await payload.find({
    collection: 'template-overrides',
    where: {
      and: [
        {
          or: scopes.map((scope) => ({
            and: [
              { targetType: { equals: scope.targetType } },
              { 'targetEntity.value': { equals: scope.targetEntity } },
              { 'targetEntity.relationTo': { equals: TARGET_TYPE_TO_RELATION[scope.targetType] } },
            ],
          })),
        },
        { or: tenantConditions },
      ],
    },
    limit: 100,
    depth: 0,
  })

  const overrides: ResolvedTemplateOverride[] = result.docs.map((doc) => ({
    id: doc.id,
    name: doc.name ?? '',
    tenant: (doc.tenant as string | number) ?? null,
    targetType: doc.targetType as 'industry-category' | 'industry' | 'job-title',
    targetEntity: (doc.targetEntity?.value as string | number) ?? null,
    sectionOverrides: mapSectionOverrides(doc as unknown as Record<string, unknown>),
  }))

  return sortOverrides(overrides)
}

// --- Keyword override chain ---

async function buildKeywordOverrideChain(
  payload: Payload,
  params: Extract<OverrideChainParams, { entityType: 'keyword-landing' }>,
): Promise<ResolvedTemplateOverride[]> {
  const { keywordSlug, tenantId } = params

  const tenantConditions: Record<string, unknown>[] = [{ tenant: { exists: false } }]
  if (tenantId) {
    tenantConditions.push({ tenant: { equals: tenantId } })
  }

  const result = await payload.find({
    collection: 'template-overrides',
    where: {
      and: [{ targetType: { equals: 'keyword-landing' } }, { or: tenantConditions }],
    },
    limit: 100,
    depth: 0,
  })

  const overrides: ResolvedTemplateOverride[] = result.docs
    .filter((doc) => {
      const pattern = (doc.targetPattern as string) ?? ''
      return matchKeywordPattern(pattern, keywordSlug)
    })
    .map((doc) => ({
      id: doc.id,
      name: doc.name ?? '',
      tenant: (doc.tenant as string | number) ?? null,
      targetType: 'keyword-landing' as const,
      targetPattern: (doc.targetPattern as string) ?? '*',
      sectionOverrides: mapSectionOverrides(doc as unknown as Record<string, unknown>),
    }))

  return sortOverrides(overrides)
}

// --- Shared helpers ---

function mapSectionOverrides(
  doc: Record<string, unknown>,
): ResolvedTemplateOverride['sectionOverrides'] {
  const rawOverrides = doc.sectionOverrides as Array<Record<string, unknown>> | undefined
  if (!rawOverrides?.length) return []

  return rawOverrides.map((so) => {
    const blockType = so.sectionBlockType as string
    const action = (so.action as 'hide' | 'override-props') ?? 'override-props'

    const overrideGroupKey = `ovrds_${blockType}`
    const overrideGroup = (so[overrideGroupKey] as Record<string, unknown>) ?? {}
    const fieldsToOverride = (overrideGroup.fieldsToOverride as string[]) ?? []

    const overrideFields: Record<string, unknown> = {}
    for (const fieldName of fieldsToOverride) {
      if (fieldName in overrideGroup) {
        overrideFields[fieldName] = overrideGroup[fieldName]
      }
    }

    return {
      sectionBlockType: blockType,
      action,
      locked: (so.locked as boolean) ?? false,
      sectionGroup: so.sectionGroup as 'before' | 'test' | 'after' | undefined,
      fieldsToOverride,
      overrideFields,
    }
  })
}
