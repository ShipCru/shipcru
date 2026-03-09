import type { EntityData, ResolvedTemplateOverride, SectionConfig } from './types'

/**
 * Checks whether a ResolvedTemplateOverride doc is a tenant-scoped override.
 * Tenant overrides cannot modify sections that were locked by a global override.
 */
function isTenantOverride(doc: ResolvedTemplateOverride): boolean {
  return doc.tenant != null
}

/**
 * Pure reducer: applies an ordered list of override docs to a base section list.
 *
 * Algorithm:
 * 1. Shallow-clone input sections (does not mutate originals)
 * 2. For each override doc, in order:
 *    - For each sectionOverride entry in the doc:
 *      - Find matching section by sectionId (fallback: blockType)
 *      - If action is "hide": mark section hidden
 *      - If action is "override-props":
 *        - If section is locked AND current doc is a tenant override: skip
 *        - Apply sectionGroup change if specified
 *        - Apply field overrides from fieldsToOverride
 *        - Set locked flag if specified
 * 3. Filter out hidden sections
 */
export function applyOverrides(
  sections: SectionConfig[],
  overrides: ResolvedTemplateOverride[],
): SectionConfig[] {
  // Shallow clone each section and deep clone fields to avoid mutation
  const result = sections.map((s) => ({ ...s, fields: { ...s.fields } }))

  for (const override of overrides) {
    for (const so of override.sectionOverrides) {
      // Match by sectionId first, fallback to blockType
      const section = result.find(
        (s) => s.sectionId === so.sectionBlockType || s.blockType === so.sectionBlockType,
      )
      if (!section) continue

      if (so.action === 'hide') {
        section.hidden = true
        continue
      }

      // action is "override-props"
      if (section.locked && isTenantOverride(override)) continue

      if (so.sectionGroup) {
        section.sectionGroup = so.sectionGroup
      }

      for (const fieldName of so.fieldsToOverride || []) {
        if (fieldName in so.overrideFields) {
          section.fields[fieldName] = so.overrideFields[fieldName]
        }
      }

      if (so.locked) {
        section.locked = true
      }
    }
  }

  return result.filter((s) => !s.hidden)
}

/**
 * Map of blockType -> predicate that checks whether the entity has
 * the data required to render that section.
 * Sections not listed here have no dependency and always pass.
 */
const DATA_DEPENDENCIES: Record<string, (entity: EntityData) => boolean> = {
  'top-skills': (entity) => (entity.skills?.length ?? 0) > 0,
  salary: (entity) => entity.hasSalaryData === true,
  certifications: (entity) => entity.hasCertifications === true,
}

/**
 * Removes sections whose data dependencies are not met by the entity.
 * Sections with no entry in DATA_DEPENDENCIES always pass (no dependency = always show).
 */
export function filterByDataDependencies(
  sections: SectionConfig[],
  entity: EntityData,
): SectionConfig[] {
  return sections.filter((section) => {
    const check = DATA_DEPENDENCIES[section.blockType]
    return check ? check(entity) : true
  })
}
