import type { GlobalConfig } from 'payload'

import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import { heroField, sectionsField } from '@/lib/fields/templateFields'
import { autoGenerateSectionIdsHook } from '@/lib/hooks/autoGenerateSectionIdsHook'
import { createGlobalRevalidationHook } from '@/lib/resume-pages/hooks/revalidateResumeData'

export const DefaultTemplates: GlobalConfig = {
  slug: 'default-templates',
  dbName: 'default_templates',
  admin: {
    group: 'Templates',
  },
  access: {
    read: () => true,
    update: isSuperAdminAccess,
  },
  hooks: {
    beforeChange: [autoGenerateSectionIdsHook],
    afterChange: [createGlobalRevalidationHook('default-templates')],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'jobTitle',
          label: 'Job Title',
          fields: [heroField(), sectionsField()],
        },
        {
          name: 'industry',
          label: 'Industry',
          fields: [heroField(), sectionsField()],
        },
        {
          name: 'keyword',
          label: 'Keyword Landing',
          fields: [heroField(), sectionsField()],
        },
      ],
    },
  ],
  versions: {
    max: 50,
    drafts: true,
  },
}
