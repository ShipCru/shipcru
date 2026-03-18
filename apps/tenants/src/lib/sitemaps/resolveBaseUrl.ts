import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

import { resolveTenantBySlug } from '@/utils/resolveTenant'

export async function resolveSitemapTenantContext() {
  const headersList = await headers()
  const tenantSlug = headersList.get('x-tenant-slug')
  if (!tenantSlug) return null

  const payload = await getPayload({ config })
  const tenant = await resolveTenantBySlug(payload, tenantSlug)
  if (!tenant) return null

  const baseUrl = tenant.domain
    ? `https://${tenant.domain}`
    : `${process.env.NEXT_PUBLIC_SERVER_URL || 'https://example.com'}`

  return { tenant, payload, baseUrl }
}
