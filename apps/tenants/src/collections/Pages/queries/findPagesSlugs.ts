import { getPayload } from 'payload'
import config from '@payload-config'

export async function findPagesSlugs() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    // overrideAccess: true (default) is intentional —
    // generateStaticParams needs all published pages across all tenants
    depth: 0,
    pagination: false,
    where: {
      _status: { equals: 'published' },
    },
    select: {
      slug: true,
      breadcrumbs: true,
    },
  })

  return result.docs
}
