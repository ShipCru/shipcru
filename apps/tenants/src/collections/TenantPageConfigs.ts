import type { CollectionConfig } from 'payload'

import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import { tenantAdminAccess } from '@/access/tenantAdminAccess'
import {
  createCollectionDeleteRevalidationHook,
  createCollectionRevalidationHook,
} from '@/lib/resume-pages/hooks/revalidateResumeData'

export const TenantPageConfigs: CollectionConfig = {
  slug: 'tenant-page-configs',
  admin: {
    useAsTitle: 'tenant',
    group: 'Tenants',
  },
  access: {
    create: isSuperAdminAccess,
    read: tenantAdminAccess,
    update: tenantAdminAccess,
    delete: isSuperAdminAccess,
  },
  hooks: {
    afterChange: [createCollectionRevalidationHook('tenant-page-configs')],
    afterDelete: [createCollectionDeleteRevalidationHook('tenant-page-configs')],
  },
  fields: [
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      unique: true,
      admin: {
        description: 'Each tenant can have exactly one page config.',
      },
    },
    {
      name: 'mode',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'All Industries', value: 'all' },
        { label: 'Include Specific', value: 'include' },
        { label: 'Exclude Specific', value: 'exclude' },
      ],
      admin: {
        description: 'Controls which industries this tenant generates pages for.',
      },
    },
    {
      name: 'industries',
      type: 'relationship',
      relationTo: 'industries',
      hasMany: true,
      admin: {
        condition: (data) => data?.mode === 'include' || data?.mode === 'exclude',
        description: 'Industries to include or exclude based on mode.',
      },
    },
    {
      name: 'jobTitleMode',
      type: 'select',
      defaultValue: 'all-in-industries',
      options: [
        { label: 'All in Selected Industries', value: 'all-in-industries' },
        { label: 'Specific Job Titles Only', value: 'specific' },
        { label: 'Exclude Specific Job Titles', value: 'exclude-specific' },
      ],
      admin: {
        description: 'Controls which job titles within the selected industries this tenant serves.',
      },
    },
    {
      name: 'jobTitles',
      type: 'relationship',
      relationTo: 'job-titles',
      hasMany: true,
      admin: {
        condition: (data) => data?.jobTitleMode === 'specific',
        description: 'Specific job titles to include.',
      },
    },
    {
      name: 'excludedJobTitles',
      type: 'relationship',
      relationTo: 'job-titles',
      hasMany: true,
      admin: {
        condition: (data) => data?.jobTitleMode === 'exclude-specific',
        description: 'Specific job titles to exclude.',
      },
    },
  ],
  timestamps: true,
}
