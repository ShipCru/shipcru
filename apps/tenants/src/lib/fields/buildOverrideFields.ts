import type { Block, Field } from 'payload'

import { fieldAffectsData } from 'payload/shared'

type FieldWithLabel = Field & { name: string; label?: unknown }

/**
 * Generates conditional override field groups from block definitions.
 *
 * For each block, collects fields marked with `custom: { overridable: true }`,
 * and creates a conditional group that appears when `sectionBlockType` matches
 * the block's slug AND `action` is `override-props`.
 *
 * Each group contains:
 * - `fieldsToOverride`: multi-select of overridable field names
 * - The actual overridable fields (made optional, shown when selected)
 */
export function buildOverrideFields(blocks: Block[]): Field[] {
  return blocks
    .map((block) => {
      const overridableFields = block.fields.filter(
        (f): f is FieldWithLabel =>
          fieldAffectsData(f) && Boolean(f.custom?.overridable),
      )

      if (!overridableFields.length) return null

      const fieldOptions = overridableFields.map((f) => ({
        label: (typeof f.label === 'string' ? f.label : null) || f.name,
        value: f.name,
      }))

      return {
        name: `ovrds_${block.slug}`,
        type: 'group' as const,
        admin: {
          condition: (_: unknown, siblingData: Record<string, unknown>) =>
            siblingData?.sectionBlockType === block.slug &&
            siblingData?.action === 'override-props',
        },
        fields: [
          {
            name: 'fieldsToOverride',
            type: 'select' as const,
            hasMany: true,
            dbName: ({ tableName }: { tableName?: string }) => `enum_${tableName}_flds`,
            options: fieldOptions,
            admin: {
              description:
                'Select which fields to override. Only selected fields will be applied during merge.',
            },
          },
          ...overridableFields.map(
            (f) =>
              ({
                ...f,
                required: false,
                admin: {
                  ...(f.admin || {}),
                  condition: (_: unknown, siblingData: Record<string, unknown>) =>
                    (siblingData?.fieldsToOverride as string[] | undefined)?.includes(f.name) ??
                    false,
                },
              }) as Field,
          ),
        ],
      } satisfies Field
    })
    .filter(Boolean) as Field[]
}
