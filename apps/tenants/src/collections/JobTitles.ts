import { type CollectionConfig, slugField } from 'payload'

import { superAdminCrud } from '@/access/superAdminCrud'
import { originFields } from '@/fields/origin'
import { seo } from '@/lib/fields/seo'

export const JobTitles: CollectionConfig = {
  slug: 'job-titles',
  access: superAdminCrud,
  admin: {
    useAsTitle: 'name',
    listSearchableFields: ['name', 'slug'],
    group: 'Resume Pages',
    defaultColumns: ['name', 'industries'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'industries',
              type: 'relationship',
              relationTo: 'industries',
              hasMany: true,
            },
            {
              name: 'suggestedContent',
              type: 'array',
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '/components/admin/ContentScoreRowLabel',
                },
              },
              fields: [
                {
                  name: 'content',
                  type: 'relationship',
                  relationTo: 'resume-content',
                  required: true,
                },
                {
                  name: 'experienceScore',
                  type: 'number',
                  min: 0,
                  max: 1,
                  defaultValue: 0,
                  admin: {
                    description: 'Supply-side: do professionals in this role report this? (0-1)',
                    width: '50%',
                  },
                },
                {
                  name: 'interestScore',
                  type: 'number',
                  min: 0,
                  max: 1,
                  defaultValue: 0,
                  admin: {
                    description: 'Demand-side: do job seekers for this role search for this? (0-1)',
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Canonical',
          fields: [
            {
              name: 'overrideSuffix',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description:
                  'Override the default canonical suffix for this job title. When unchecked, the global canonical suffix from Suffix Variations is used.',
              },
            },
            {
              name: 'suffixAdjective',
              type: 'relationship',
              relationTo: 'word-form-sets',
              filterOptions: { type: { equals: 'adjective' } },
              admin: {
                condition: (data) => data?.overrideSuffix === true,
                description: 'Adjective word for canonical suffix (e.g., "best")',
              },
            },
            {
              name: 'suffixBuilder',
              type: 'relationship',
              relationTo: 'word-form-sets',
              filterOptions: { type: { equals: 'verb' } },
              admin: {
                condition: (data) => data?.overrideSuffix === true,
                description: 'Builder word for canonical suffix (e.g., "creator")',
              },
            },
            {
              name: 'suffixContentWord',
              type: 'relationship',
              relationTo: 'word-form-sets',
              filterOptions: { type: { equals: 'contentWord' } },
              admin: {
                condition: (data) => data?.overrideSuffix === true,
                description: 'Content word for canonical suffix (e.g., "content")',
              },
            },
            {
              name: 'suffixStrategy',
              type: 'select',
              options: [
                { label: '301 Redirect', value: 'redirect-301' },
                { label: '302 Redirect', value: 'redirect-302' },
                { label: 'rel="canonical" (no redirect)', value: 'rel-canonical' },
              ],
              admin: {
                condition: (data) => data?.overrideSuffix === true,
                description: 'Override the global canonical strategy for this job title.',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [...seo()],
        },
      ],
    },
    slugField({ useAsSlug: 'name' }),
    {
      name: 'probability',
      type: 'number',
      min: 0,
      max: 1,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Confidence this is a real job title (1.0 = SOC/O*NET verified)',
      },
    },
    originFields(),
    {
      name: 'exampleUrls',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '/components/admin/ExampleUrls#ExampleUrls',
        },
      },
    },
  ],
}
