import type { CollectionConfig } from 'payload'

import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import { tenantSelfAccess } from '@/access/tenantSelfAccess'
import {
  createCollectionDeleteRevalidationHook,
  createCollectionRevalidationHook,
} from '@/lib/resume-pages/hooks/revalidateResumeData'
import { SUPPORTED_LOCALES } from '@/locales'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: isSuperAdminAccess,
    read: tenantSelfAccess,
    update: isSuperAdminAccess,
    delete: isSuperAdminAccess,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'domain'],
    group: 'Tenants',
  },
  hooks: {
    afterChange: [createCollectionRevalidationHook('tenants')],
    afterDelete: [createCollectionDeleteRevalidationHook('tenants')],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
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
        },
        {
          label: 'Page Config',
          fields: [
            {
              name: 'industryMode',
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
                condition: (data) =>
                  data?.industryMode === 'include' || data?.industryMode === 'exclude',
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
                description:
                  'Controls which job titles within the selected industries this tenant serves.',
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
            {
              name: 'keywordLandings',
              type: 'group',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Enable Keyword Landings',
                },
                {
                  name: 'mode',
                  type: 'select',
                  options: [
                    { label: 'All', value: 'all' },
                    { label: 'Include', value: 'include' },
                    { label: 'Exclude', value: 'exclude' },
                  ],
                  defaultValue: 'all',
                  admin: {
                    condition: (_data, siblingData) => siblingData?.enabled === true,
                  },
                },
                {
                  name: 'patterns',
                  type: 'array',
                  label: 'URL Patterns',
                  admin: {
                    condition: (_data, siblingData) =>
                      siblingData?.enabled === true &&
                      (siblingData?.mode === 'include' || siblingData?.mode === 'exclude'),
                    description:
                      'Glob patterns using * as wildcard. E.g., "best-*", "*-resume-*", "free-*-templates"',
                  },
                  fields: [
                    {
                      name: 'pattern',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
