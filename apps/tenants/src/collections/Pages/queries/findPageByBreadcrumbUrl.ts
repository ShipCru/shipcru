import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function findPageByBreadcrumbUrl(tenantId: number | string, slugPath: string) {
  // nestedDocsPlugin generates '/home' for the root page, never bare '/'.
  const url = !slugPath || slugPath === '/' ? '/home' : `/${slugPath}`
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      and: [
        { 'breadcrumbs.url': { equals: url } },
        { tenant: { equals: tenantId } },
      ],
    },
  })

  return result.docs?.[0] ?? null
}
