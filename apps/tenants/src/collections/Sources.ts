import { type CollectionConfig, slugField } from 'payload'

import { superAdminCrud } from '@/access/superAdminCrud'

export const Sources: CollectionConfig = {
  slug: 'sources',
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
      unique: true,
    },
    slugField({ useAsSlug: 'name' }),
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional context about this data source.',
      },
    },
  ],
}
