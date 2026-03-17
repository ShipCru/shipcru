import type { ResolvedTemplateOverride } from './types'
import type { Payload } from 'payload'

import { TARGET_TYPE_TO_RELATION } from './types'

/**
 * Priority order for target types. Index = applied first (less specific).
 * Category overrides are most generic, job-title overrides are most specific.
 */
const TARGET_TYPE_PRIORITY = ['industry-category', 'industry', 'job-title'] as const

/**
 * Sorts override docs into the correct merge order:
 * 1. Global category override
 * 2. Global industry override
 * 3. Global slug (job-title) override
 * 4. Tenant category override
 * 5. Tenant industry override
 * 6. Tenant slug (job-title) override
 *
 * Within the same tier (global vs tenant) and target type, order is stable.
 */
export function sortOverrides(docs: ResolvedTemplateOverride[]): ResolvedTemplateOverride[] {
  return [...docs].sort((a, b) => {
    // Global overrides come before tenant overrides
    const aIsTenant = a.tenant != null ? 1 : 0
    const bIsTenant = b.tenant != null ? 1 : 0
    if (aIsTenant !== bIsTenant) return aIsTenant - bIsTenant

    // Within same tier, sort by target type specificity
    const aIdx = TARGET_TYPE_PRIORITY.indexOf(a.targetType as (typeof TARGET_TYPE_PRIORITY)[number])
    const bIdx = TARGET_TYPE_PRIORITY.indexOf(b.targetType as (typeof TARGET_TYPE_PRIORITY)[number])
    const aPriority = aIdx === -1 ? 99 : aIdx
    const bPriority = bIdx === -1 ? 99 : bIdx
    return aPriority - bPriority
  })
}

export interface OverrideChainParams {
  entityType: 'industry' | 'job-title'
  entityId: string | number
  categoryId: string | number | null
  industryId: string | number | null
  tenantId: string | number | null
}

/**
 * Fetches all relevant override docs for a given entity and sorts them into merge order.
 *
 * This is the async part that queries the database. The pure sorting logic is in `sortOverrides`.
 */
export async function buildOverrideChain(
  payload: Payload,
  params: OverrideChainParams,
): Promise<ResolvedTemplateOverride[]> {
  const { entityType, entityId, categoryId, industryId, tenantId } = params

  // Build applicable target scopes based on entity hierarchy
  const scopes: { targetType: string; targetEntity: string | number }[] = []

  if (categoryId) {
    scopes.push({ targetType: 'industry-category', targetEntity: categoryId })
  }

  const effectiveIndustryId = entityType === 'industry' ? entityId : industryId
  if (effectiveIndustryId) {
    scopes.push({ targetType: 'industry', targetEntity: effectiveIndustryId })
  }

  if (entityType === 'job-title') {
    scopes.push({ targetType: 'job-title', targetEntity: entityId })
  }

  if (scopes.length === 0) return []

  // Always include global overrides; include tenant if provided
  const tenantConditions: Record<string, unknown>[] = [{ tenant: { exists: false } }]
  if (tenantId) {
    tenantConditions.push({ tenant: { equals: tenantId } })
  }

  // Single query: (any matching scope) AND (global OR tenant)
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

  // Map raw docs to ResolvedTemplateOverride shape.
  const overrides: ResolvedTemplateOverride[] = result.docs.map((doc) => ({
    id: doc.id,
    name: doc.name ?? '',
    tenant: (doc.tenant as string | number) ?? null,
    targetType: (doc.targetType as ResolvedTemplateOverride['targetType']) ?? null,
    // At depth: 0, value is always a number (ID), not a populated doc
    targetEntity: (doc.targetEntity?.value as string | number) ?? null,
    sectionOverrides: mapSectionOverrides(doc as unknown as Record<string, unknown>),
  }))

  return sortOverrides(overrides)
}

/**
 * Maps the raw sectionOverrides from a ResolvedTemplateOverride document into the
 * SectionOverrideEntry shape expected by applyOverrides.
 *
 * This bridges the Payload collection schema (with `ovrds_{blockSlug}` groups
 * and `fieldsToOverride` selects) into the flat SectionOverrideEntry format.
 */
function mapSectionOverrides(
  doc: Record<string, unknown>,
): ResolvedTemplateOverride['sectionOverrides'] {
  const rawOverrides = doc.sectionOverrides as Array<Record<string, unknown>> | undefined
  if (!rawOverrides?.length) return []

  return rawOverrides.map((so) => {
    const blockType = so.sectionBlockType as string
    const action = (so.action as 'hide' | 'override-props') ?? 'override-props'

    // Extract field overrides from the block-specific override group
    const overrideGroupKey = `ovrds_${blockType}`
    const overrideGroup = (so[overrideGroupKey] as Record<string, unknown>) ?? {}
    const fieldsToOverride = (overrideGroup.fieldsToOverride as string[]) ?? []

    // Build overrideFields from the group, excluding the fieldsToOverride meta-field
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
