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

  // Look up by assignmentKey (the variationSet field stores the assignmentKey string)
  const set = field.variationSet ? variationSets.get(field.variationSet) : undefined

  if (!set) {
    // Fallback: if the variation set is not found, use fixedText
    return field.fixedText || ''
  }

  const filteredOptions = filterOptionsForEntity(set.options, hasSkills)
  const seed = `${tenantSlug}.${contentSeed}.${set.assignmentKey}`
  const rng = seedrandom(seed)

  return weightedSelect(filteredOptions, rng)
}
