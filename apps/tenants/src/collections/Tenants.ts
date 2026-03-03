import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import { SUPPORTED_LOCALES } from '@/locales'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: isSuperAdminAccess,
    read: authenticated,
    update: isSuperAdminAccess,
    delete: isSuperAdminAccess,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'domain'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-safe identifier for this tenant',
      },
    },
    {
      name: 'domain',
      type: 'text',
      unique: true,
      admin: {
        description: 'Custom domain for this tenant',
      },
    },
    {
      name: 'supportedLocales',
      type: 'select',
      hasMany: true,
      defaultValue: ['en'],
      options: [...SUPPORTED_LOCALES],
      admin: {
        description: 'Locales available for this tenant',
      },
    },
  ],
  timestamps: true,
}
