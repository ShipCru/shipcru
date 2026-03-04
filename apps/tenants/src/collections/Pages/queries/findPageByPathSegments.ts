import { draftMode, headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function findPageByPathSegments(pathSegments: string[]) {
  const segments = pathSegments.length === 0 ? ['home'] : pathSegments
  const url = `/${segments.join('/')}`

  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config })

  let user = null
  if (draft) {
    const headers = await getHeaders()
    const authResult = await payload.auth({ headers })
    user = authResult.user
  }

  const result = await payload.find({
    collection: 'pages',
    draft,
    overrideAccess: false,
    user,
    limit: 1,
    depth: 2,
    where: {
      'breadcrumbs.url': { equals: url },
    },
    select: {
      title: true,
      slug: true,
      breadcrumbs: true,
      layout: true,
      hero: true,
      meta: true,
    },
  })

  return result.docs[0] ?? null
}
