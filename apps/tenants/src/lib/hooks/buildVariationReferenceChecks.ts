import type { Block, Field } from 'payload'

import { fieldAffectsData } from 'payload/shared'

interface ReferenceCheck {
  collection: string
  field: string
}

/**
 * Builds reference-check entries for `preventReferencedDeletion` by scanning
 * blocks for overridable variation fields (groups with a `variationSet`
 * relationship to `content-variations`).
 *
 * The generated field paths match the structure created by `buildOverrideFields`:
 *   `sectionOverrides.ovrds_<blockSlug>.<fieldName>.variationSet`
 */
export function buildVariationReferenceChecks(blocks: Block[]): ReferenceCheck[] {
  const checks: ReferenceCheck[] = []

  for (const block of blocks) {
    const overridableVariationFields = block.fields.filter(
      (f): f is Field & { name: string } =>
        fieldAffectsData(f) &&
        Boolean(f.custom?.overridable) &&
        f.type === 'group' &&
        f.fields.some(
          (sub) => 'name' in sub && sub.name === 'variationSet' && sub.type === 'relationship',
        ),
    )

    for (const f of overridableVariationFields) {
      checks.push({
        collection: 'template-overrides',
        field: `sectionOverrides.ovrds_${block.slug}.${f.name}.variationSet`,
      })
    }
  }

  return checks
}
