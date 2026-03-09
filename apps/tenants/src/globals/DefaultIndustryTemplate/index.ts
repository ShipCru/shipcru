import type { GlobalConfig } from 'payload'

import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import { HERO_BLOCKS, LAYOUT_BLOCKS } from '@/blocks'
import { autoGenerateSectionIdsHook } from '@/lib/hooks/autoGenerateSectionIdsHook'
import { createGlobalRevalidationHook } from '@/lib/resume-pages/hooks/revalidateResumeData'

export const DefaultIndustryTemplate: GlobalConfig = {
  slug: 'default-industry-template',
  dbName: 'industry_template',
  label: 'Default Industry Template',
  admin: { group: 'Templates' },
  access: {
    read: () => true,
    update: isSuperAdminAccess,
  },
  hooks: {
    beforeChange: [autoGenerateSectionIdsHook],
    afterChange: [createGlobalRevalidationHook('default-industry-template')],
  },
  fields: [
    {
      name: 'hero',
      type: 'blocks',
      maxRows: 1,
      blocks: [...HERO_BLOCKS],
    },
    {
      name: 'sections',
      type: 'blocks',
      blocks: [...LAYOUT_BLOCKS],
      admin: { initCollapsed: true },
    },
  ],
}
