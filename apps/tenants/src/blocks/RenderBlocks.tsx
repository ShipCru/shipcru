import type React from 'react'
import { Fragment } from 'react'

import type { Page } from '@/payload-types'
import { BlogBlock } from './Blog/Component'
import { HeroSplitImageBlock } from './HeroSplitImage/Component'
import { MetricsBlock } from './Metrics/Component'
import { TestimonialsBlock } from './Testimonials/Component'

type HeroBlock = NonNullable<Page['hero']>[number]
type LayoutBlock = NonNullable<Page['layout']>[number]

const blockComponents: Record<string, React.ComponentType<{ data: any }>> = {
  heroSplitImage: HeroSplitImageBlock,
  blog: BlogBlock,
  testimonials: TestimonialsBlock,
  metrics: MetricsBlock,
}

export const RenderBlocks: React.FC<{ blocks: LayoutBlock[] }> = ({ blocks }) => {
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

export const RenderHero: React.FC<{ blocks: HeroBlock[] }> = ({ blocks }) => {
  if (!blocks?.length) return null

  const block = blocks[0]
  const Component = blockComponents[block.blockType]
  if (!Component) return null

  return <Component data={block} />
}
