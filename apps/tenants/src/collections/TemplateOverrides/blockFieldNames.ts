import { HERO_BLOCKS, LAYOUT_BLOCKS } from '@/blocks'

const ALL_BLOCKS = [...HERO_BLOCKS, ...LAYOUT_BLOCKS]

/** Map of block slug -> array of field names, built once at config time */
export const blockFieldNames = new Map<string, string[]>(
  ALL_BLOCKS.map((block) => [
    block.slug,
    block.fields.filter((f) => 'name' in f).map((f) => (f as { name: string }).name),
  ]),
)
