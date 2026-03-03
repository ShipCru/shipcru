import type { CollectionConfig } from 'payload'

import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'

import { authenticated } from '@/access/authenticated'
import { isSuperAdmin } from '@/access/isSuperAdmin'
import { createAccess } from './access/create'
import { readAccess } from './access/read'
import { updateAndDeleteAccess } from './access/updateAndDelete'

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: 'tenants',
  tenantsArrayTenantFieldName: 'tenant',
  tenantsCollectionSlug: 'tenants',
  arrayFieldAccess: {},
  tenantFieldAccess: {},
  rowFields: [
    {
      name: 'roles',
      type: 'select',
      defaultValue: ['editor'],
      hasMany: true,
      options: ['tenant-admin', 'editor'],
      required: true,
    },
  ],
})

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: createAccess,
    read: readAccess,
    update: updateAndDeleteAccess,
    delete: updateAndDeleteAccess,
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      defaultValue: [],
      hasMany: true,
      options: ['super-admin'],
      saveToJWT: true,
      admin: {
        position: 'sidebar',
      },
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField?.admin || {}),
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
