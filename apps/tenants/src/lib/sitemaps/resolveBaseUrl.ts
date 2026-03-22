import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

import { resolveTenantBySlug } from '@/utils/resolveTenant'

export async function resolveSitemapTenantContext() {
  let tenantSlug: string | null = null
  try {
    const headersList = await headers()
    tenantSlug = headersList.get('x-tenant-slug')
  } catch {
    tenantSlug = process.env.DEFAULT_TENANT_SLUG || null
  }
  if (!tenantSlug) return null

  const payload = await getPayload({ config })
  const tenant = await resolveTenantBySlug(payload, tenantSlug)
  if (!tenant) return null

  const baseUrl = tenant.domain
    ? `https://${tenant.domain}`
    : `${process.env.NEXT_PUBLIC_SERVER_URL || 'https://example.com'}`

  return { tenant, payload, baseUrl }
}
