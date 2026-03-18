import type { AssembledPage } from './renderTemplate'

import React from 'react'

import { RenderBlocks, RenderHero } from '@/blocks/RenderBlocks'

export function RenderedPage({ page }: { page: AssembledPage }) {
  return (
    <article>
      {page.heroBlock && <RenderHero blocks={[page.heroBlock]} />}
      <RenderBlocks blocks={page.sectionBlocks} />
    </article>
  )
}
