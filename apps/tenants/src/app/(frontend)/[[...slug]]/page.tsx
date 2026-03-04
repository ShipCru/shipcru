import type { Metadata } from 'next'

import { draftMode } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

import { RenderBlocks, RenderHero } from '@/blocks/RenderBlocks'
import { findPageByPathSegments } from '@/collections/Pages/queries/findPageByPathSegments'
import { findPagesSlugs } from '@/collections/Pages/queries/findPagesSlugs'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getPathFromBreadcrumbs } from '@/utils/buildUrl'
import { generateMeta } from '@/utils/generateMeta'

type Args = { params: Promise<{ slug?: string[] }> }

export async function generateStaticParams() {
  const pages = await findPagesSlugs()

  return pages
    .map((page) => {
      const path = getPathFromBreadcrumbs(page.breadcrumbs)
      if (!path || path === 'home') return { slug: [] }
      return { slug: path.split('/') }
    })
    .filter(
      (params, index, self) =>
        self.findIndex((p) => JSON.stringify(p.slug) === JSON.stringify(params.slug)) === index,
    )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = [] } = await paramsPromise
  const page = await findPageByPathSegments(slug)
  return generateMeta({ doc: page })
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = [] } = await paramsPromise

  if (slug.length > 0 && slug[0] === 'home') {
    redirect('/')
  }

  const page = await findPageByPathSegments(slug)

  if (!page) {
    notFound()
  }

  return (
    <article>
      {draft && <LivePreviewListener />}
      <RenderHero blocks={page.hero || []} />
      <RenderBlocks blocks={page.layout || []} />
    </article>
  )
}
