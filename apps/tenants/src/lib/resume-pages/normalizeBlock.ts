import type { SectionConfig } from './types'

/** Fields that are structural metadata and should not be included in the fields record */
const META_FIELDS = new Set(['blockType', 'sectionId', 'sectionGroup', 'id', 'blockName'])

/**
 * Converts a raw Payload block (from a template global's hero or sections field)
 * into a normalized SectionConfig for the merge pipeline.
 *
 * All non-meta fields are placed into the `fields` record.
 * Meta fields (blockType, sectionId, sectionGroup, id) are mapped to their
 * corresponding SectionConfig properties.
 */
export function normalizeBlock(block: object): SectionConfig {
  const b = block as Record<string, unknown>
  const fields: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(b)) {
    if (!META_FIELDS.has(key)) {
      fields[key] = value
    }
  }

  return {
    blockType: b.blockType as string,
    sectionId: (b.sectionId as string) || (b.blockType as string),
    sectionGroup: (b.sectionGroup as SectionConfig['sectionGroup']) || 'test',
    hidden: false,
    locked: false,
    fields,
  }
}
