import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { RenderBlocks, RenderHero } from '@/blocks/RenderBlocks'
import config from '@/payload.config'

type Args = { params: Promise<{ slug?: string[] }> }

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = [] } = await paramsPromise
  const pageSlug = slug.length === 0 ? 'home' : slug[slug.length - 1]

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    draft,
    overrideAccess: draft,
    limit: 1,
    where: {
      slug: { equals: pageSlug },
    },
  })

  const page = result.docs[0]

  if (!page) {
    notFound()
  }

  return (
    <article>
      <RenderHero blocks={page.hero || []} />
      <RenderBlocks blocks={page.layout || []} />
    </article>
  )
}
