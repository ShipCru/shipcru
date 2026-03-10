import { type CollectionConfig, slugField } from 'payload'

import { superAdminCrud } from '@/access/superAdminCrud'

export const IndustryCategories: CollectionConfig = {
  slug: 'industry-categories',
  access: superAdminCrud,
  admin: {
    useAsTitle: 'name',
    group: 'Resume Pages',
    defaultColumns: ['name', 'slug'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    slugField({
      useAsSlug: 'name',
    }),
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'industries',
      type: 'join',
      collection: 'industries',
      on: 'category',
    },
  ],
}
