import type { VariationFieldValue, VariationInput } from './types'

import seedrandom from 'seedrandom'

import { filterOptionsForEntity } from './filterOptionsForEntity'
import { weightedSelect } from './weightedSelect'

/**
 * Resolves a single variation field value to a concrete text string.
 *
 * For "fixed" mode, returns the fixedText directly.
 * For "variation" mode, constructs a deterministic seed from
 * `{tenantSlug}.{contentSeed}.{assignmentKey}`, then uses seeded
 * PRNG to select from the weighted options pool.
 *
 * The returned text may still contain template variables like `$(adjective)`
 * or `{skill1}` -- those are resolved in Phase 3 (variable substitution).
 * However, if the entity has no skills, options containing `{skill1}` / `{skill2}`
 * are filtered out before selection.
 *
 * @param field - The variation field value (mode + fixedText or variationSet ref)
 * @param context - Tenant slug, content seed, loaded variation sets, and entity skills
 * @returns The selected concrete text string
 */
export function resolveVariationField(
  field: VariationFieldValue,
  context: VariationInput,
): string {
  if (field.mode === 'fixed') {
    return field.fixedText || ''
  }

  const { tenantSlug, contentSeed, variationSets, entitySkills } = context
  const hasSkills = entitySkills.length > 0

  // Resolve the variationSet reference to a lookup key.
  // The value can be:
  //  - a string (assignmentKey, if stored directly)
  //  - a number (Payload relationship ID at depth 0)
  //  - a populated object with { id, assignmentKey } (at depth > 0)
  const lookupKey = resolveVariationSetKey(field.variationSet)
  const set = lookupKey ? variationSets[lookupKey] : undefined

  if (!set) {
    // Fallback: if the variation set is not found, use fixedText
    return field.fixedText || ''
  }

  const filteredOptions = filterOptionsForEntity(set.options, hasSkills)
  const seed = `${tenantSlug}.${contentSeed}.${set.assignmentKey}`
  const rng = seedrandom(seed)

  return weightedSelect(filteredOptions, rng)
}

/**
 * Extracts a lookup key from a variationSet field value.
 * Handles three forms:
 *  - string: used as-is (assignmentKey)
 *  - number: stringified (Payload document ID from depth-0 queries)
 *  - object: extracts assignmentKey, falls back to stringified id
 */
function resolveVariationSetKey(ref: unknown): string | undefined {
  if (typeof ref === 'string') return ref
  if (typeof ref === 'number') return String(ref)
  if (typeof ref === 'object' && ref !== null) {
    const obj = ref as Record<string, unknown>
    if (typeof obj.assignmentKey === 'string') return obj.assignmentKey
    if (obj.id != null) return String(obj.id)
  }
  return undefined
}
