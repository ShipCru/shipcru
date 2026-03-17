import type { BlocksField } from 'payload'

import { HERO_BLOCKS, LAYOUT_BLOCKS } from '@/blocks'

export function heroField(): BlocksField {
  return {
    name: 'hero',
    type: 'blocks',
    maxRows: 1,
    blocks: [...HERO_BLOCKS],
  }
}

export function sectionsField(): BlocksField {
  return {
    name: 'sections',
    type: 'blocks',
    blocks: [...LAYOUT_BLOCKS],
    admin: { initCollapsed: true },
  }
}
