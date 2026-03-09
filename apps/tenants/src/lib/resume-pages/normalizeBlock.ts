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
export function normalizeBlock(block: Record<string, unknown>): SectionConfig {
  const fields: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(block)) {
    if (!META_FIELDS.has(key)) {
      fields[key] = value
    }
  }

  return {
    blockType: block.blockType as string,
    sectionId: (block.sectionId as string) || (block.blockType as string),
    sectionGroup: (block.sectionGroup as SectionConfig['sectionGroup']) || 'test',
    hidden: false,
    locked: false,
    fields,
  }
}
