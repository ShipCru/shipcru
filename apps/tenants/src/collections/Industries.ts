import { type CollectionConfig, slugField } from 'payload'

import { superAdminCrud } from '@/access/superAdminCrud'
import { seo } from '@/lib/fields/seo'

export const Industries: CollectionConfig = {
  slug: 'industries',
  access: superAdminCrud,
  admin: {
    useAsTitle: 'name',
    listSearchableFields: ['name', 'slug'],
    group: 'Resume Pages',
    defaultColumns: ['name', 'slug', 'category'],
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
              name: 'category',
              type: 'relationship',
              relationTo: 'industry-categories',
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'jobTitles',
              type: 'join',
              collection: 'job-titles',
              on: 'industries',
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
    slugField({
      useAsSlug: 'name',
    }),
  ],
}
