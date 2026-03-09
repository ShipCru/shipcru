import type { User } from '@/payload-types'
import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { isSuperAdmin, isSuperAdminAccess } from '@/access/isSuperAdmin'
import { tenantAdminAccess } from '@/access/tenantAdminAccess'
import { HERO_BLOCKS, LAYOUT_BLOCKS } from '@/blocks'
import { buildOverrideFields } from '@/lib/fields/buildOverrideFields'
import {
  createCollectionDeleteRevalidationHook,
  createCollectionRevalidationHook,
} from '@/lib/resume-pages/hooks/revalidateResumeData'
import { blockFieldNames } from './blockFieldNames'
import { preventDuplicateOverride } from './hooks/preventDuplicateOverride'
import { suggestFieldName } from './levenshtein'

const ALL_BLOCKS = [...HERO_BLOCKS, ...LAYOUT_BLOCKS]

const blockOptions = ALL_BLOCKS.map((b) => ({
  label: (typeof b.labels?.singular === 'string' ? b.labels.singular : null) || b.slug,
  value: b.slug,
}))

export const TemplateOverrides: CollectionConfig = {
  slug: 'template-overrides',
  dbName: 'tmpl_ovrd',
  admin: {
    useAsTitle: 'name',
    group: 'Templates',
    defaultColumns: ['name', 'targetType', 'tenant'],
    listSearchableFields: ['name'],
  },
  access: {
    create: tenantAdminAccess,
    read: authenticated,
    update: tenantAdminAccess,
    delete: isSuperAdminAccess,
  },
  hooks: {
    beforeValidate: [preventDuplicateOverride],
    afterChange: [createCollectionRevalidationHook('template-overrides')],
    afterDelete: [createCollectionDeleteRevalidationHook('template-overrides')],
  },
  fields: [
    // --- Targeting Fields ---
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Human-readable label for this override',
      },
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      admin: {
        position: 'sidebar',
        description: 'Leave empty for a global override',
      },
    },
    {
      name: 'targetType',
      type: 'select',
      options: [
        { label: 'Industry Category', value: 'industry-category' },
        { label: 'Industry', value: 'industry' },
        { label: 'Job Title', value: 'job-title' },
      ],
    },
    {
      name: 'targetEntity',
      type: 'relationship',
      relationTo: ['industry-categories', 'industries', 'job-titles'],
    },

    // --- Section Overrides Array ---
    {
      name: 'sectionOverrides',
      type: 'array',
      dbName: ({ tableName }: { tableName?: string }) => `${tableName}_sect_ovrd`,
      labels: { singular: 'Section Override', plural: 'Section Overrides' },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'sectionBlockType',
          type: 'select',
          options: blockOptions,
          admin: {
            description: 'Which block type this override applies to',
          },
        },
        {
          name: 'action',
          type: 'select',
          defaultValue: 'override-props',
          options: [
            { label: 'Hide Section', value: 'hide' },
            { label: 'Override Properties', value: 'override-props' },
          ],
        },
        {
          name: 'locked',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'When locked, tenant overrides cannot modify this section.',
            condition: (data, _siblingData, { user }) =>
              isSuperAdmin(user as User | null) && !data?.tenant,
          },
        },
        {
          name: 'sectionGroup',
          type: 'select',
          options: [
            { label: 'Before (fixed, top)', value: 'before' },
            { label: 'Test (randomized middle)', value: 'test' },
            { label: 'After (fixed, bottom)', value: 'after' },
          ],
          admin: {
            condition: (_data, siblingData) => siblingData?.action === 'override-props',
            description: 'Override the section ordering group',
          },
        },

        // Auto-generated per-block override field groups
        ...buildOverrideFields(ALL_BLOCKS),

        // Escape hatch for super-admins
        {
          name: 'advancedOverrides',
          type: 'json',
          admin: {
            description:
              'JSON escape hatch for overrides not covered by the UI fields. Top-level keys must match block field names.',
            condition: (data, _siblingData, { user }) => isSuperAdmin(user as User | null),
          },
          validate: (value, { siblingData }) => {
            if (!value || typeof value !== 'object') return true

            const blockType = (siblingData as Record<string, unknown>)?.sectionBlockType as string
            if (!blockType) return true

            const validNames = blockFieldNames.get(blockType)
            if (!validNames) return true

            const keys = Object.keys(value as Record<string, unknown>)
            const unknownKeys = keys.filter((k) => !validNames.includes(k))

            if (unknownKeys.length === 0) return true

            const messages = unknownKeys.map((k) => {
              const suggestion = suggestFieldName(k, validNames)
              return suggestion
                ? `Unknown field '${k}' in ${blockType}. Did you mean '${suggestion}'?`
                : `Unknown field '${k}' in ${blockType}. Valid fields: ${validNames.join(', ')}`
            })

            return messages.join(' ')
          },
        },
      ],
    },
  ],
  timestamps: true,
}
