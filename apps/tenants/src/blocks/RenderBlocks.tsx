import type { Page } from '@/payload-types'
import type React from 'react'

import { Fragment } from 'react'

import { BlogBlock } from './Blog/Component'
import { CTABlock } from './CTA/Component'
import { HeroSplitImageBlock } from './HeroSplitImage/Component'
import { MetricsBlock } from './Metrics/Component'
import { TestimonialsBlock } from './Testimonials/Component'

type HeroBlock = NonNullable<Page['hero']>[number]
type LayoutBlock = NonNullable<Page['layout']>[number]

export type Block = HeroBlock | LayoutBlock

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockComponents: Record<Block['blockType'], React.ComponentType<any>> = {
  heroSplit: HeroSplitImageBlock,
  blog: BlogBlock,
  testimonials: TestimonialsBlock,
  metrics: MetricsBlock,
  cta: CTABlock,
}

export const RenderBlocks: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
  if (!blocks?.length) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null
        return <Component data={block} key={index} />
      })}
    </Fragment>
  )
}

export const RenderHero: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
  if (!blocks?.length) return null

  const block = blocks[0]
  const Component = blockComponents[block.blockType]
  if (!Component) return null

  return <Component data={block} />
}
