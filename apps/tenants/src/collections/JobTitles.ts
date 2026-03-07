import { type CollectionConfig, slugField } from 'payload'

import { superAdminCrud } from '@/access/superAdminCrud'
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
            },
            slugField({
              useAsSlug: 'name',
            }),
            {
              name: 'industries',
              type: 'relationship',
              relationTo: 'industries',
              hasMany: true,
            },
            {
              name: 'suggestedSkills',
              type: 'relationship',
              relationTo: 'skills',
              hasMany: true,
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
  ],
}
