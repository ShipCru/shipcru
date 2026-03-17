import type { SectionConfig, VariationFieldValue, VariationInput } from './types'
import type { Block } from '@/blocks/RenderBlocks'

import { resolveVariationField } from './resolveVariations'
import { substituteVariables } from './substituteVariables'

export function sectionToBlock(section: SectionConfig): Block {
  return { blockType: section.blockType, ...section.fields } as Block
}

export function isVariationFieldValue(value: unknown): value is VariationFieldValue {
  if (typeof value !== 'object' || value === null || !('mode' in value)) return false
  const { mode } = value as Record<string, unknown>
  return mode === 'fixed' || mode === 'variation'
}

export function resolveVariationsInSection(
  section: SectionConfig,
  ctx: VariationInput,
): SectionConfig {
  return {
    ...section,
    fields: resolveFieldValues(section.fields, ctx),
  }
}

export function resolveFieldValues(
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

export function substituteSection(
  section: SectionConfig,
  ctx: Parameters<typeof substituteVariables>[1],
): SectionConfig {
  return {
    ...section,
    fields: substituteFieldValues(section.fields, ctx),
  }
}

export function substituteFieldValues(
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
