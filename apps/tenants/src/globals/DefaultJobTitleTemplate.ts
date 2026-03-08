import type { GlobalConfig } from 'payload'

import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import { HERO_BLOCKS, LAYOUT_BLOCKS } from '@/blocks'

export const DefaultJobTitleTemplate: GlobalConfig = {
  slug: 'default-job-title-template',
  label: 'Default Job Title Template',
  admin: { group: 'Templates' },
  access: {
    read: () => true,
    update: isSuperAdminAccess,
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
