import type { CollectionConfig } from 'payload'

import { superAdminCrud } from '@/access/superAdminCrud'
import { HERO_BLOCKS, LAYOUT_BLOCKS } from '@/blocks'
import { buildVariationReferenceChecks } from '@/lib/hooks/buildVariationReferenceChecks'
import { preventReferencedDeletion } from '@/lib/resume-pages/hooks/preventReferencedDeletion'
import {
  createCollectionDeleteRevalidationHook,
  createCollectionRevalidationHook,
} from '@/lib/resume-pages/hooks/revalidateResumeData'

const ALL_BLOCKS = [...HERO_BLOCKS, ...LAYOUT_BLOCKS]

export const ContentVariations: CollectionConfig = {
  slug: 'content-variations',
  access: superAdminCrud,
  admin: {
    useAsTitle: 'name',
    group: 'Templates',
    defaultColumns: ['name', 'assignmentKey'],
    listSearchableFields: ['name', 'assignmentKey'],
  },
  hooks: {
    afterChange: [createCollectionRevalidationHook('content-variations')],
    afterDelete: [createCollectionDeleteRevalidationHook('content-variations')],
    beforeValidate: [
      ({ data, operation }) => {
        // Auto-generate assignmentKey from name using dot-notation style:
        // "Hero Title" → "hero.title", "Testimonials Heading" → "testimonials.heading"
        if (
          (operation === 'create' || operation === 'update') &&
          data?.name &&
          !data.assignmentKey
        ) {
          data.assignmentKey = data.name
            .toLowerCase()
            .replace(/[^a-z0-9\s.]/g, '')
            .trim()
            .replace(/\s+/g, '.')
        }
        return data
      },
    ],
    beforeDelete: [preventReferencedDeletion(buildVariationReferenceChecks(ALL_BLOCKS))],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'assignmentKey',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'Auto-generated dot-notation key from name (e.g. hero.title). ' +
          'Uses a beforeValidate hook or slugField-like approach to derive from the name field.',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'content-variations',
      admin: {
        condition: () => false, // Hidden -- inheritance logic deferred to Phase 2
      },
    },
    {
      name: 'options',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'textarea',
          admin: {
            components: {
              Description: '/components/TemplateVariableReference#TemplateVariableReference',
            },
          },
        },
        {
          name: 'weight',
          type: 'number',
          defaultValue: 1,
          min: 1,
        },
      ],
    },
  ],
}
