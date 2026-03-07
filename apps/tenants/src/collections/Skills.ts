import { type CollectionConfig, slugField } from 'payload'

import { superAdminCrud } from '@/access/superAdminCrud'

export const Skills: CollectionConfig = {
  slug: 'skills',
  access: superAdminCrud,
  admin: {
    useAsTitle: 'name',
    group: 'Resume Pages',
    defaultColumns: ['name', 'slug', 'category'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    slugField({
      useAsSlug: 'name',
    }),
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Technical', value: 'technical' },
        { label: 'Soft', value: 'soft' },
        { label: 'Certification', value: 'certification' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
