import type { GlobalConfig } from 'payload'

import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import { HERO_BLOCKS, LAYOUT_BLOCKS } from '@/blocks'
import { autoGenerateSectionIdsHook } from '@/lib/hooks/autoGenerateSectionIdsHook'

export const DefaultIndustryTemplate: GlobalConfig = {
  slug: 'default-industry-template',
  label: 'Default Industry Template',
  admin: { group: 'Templates' },
  access: {
    read: () => true,
    update: isSuperAdminAccess,
  },
  hooks: {
    beforeChange: [autoGenerateSectionIdsHook],
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
