import type { Tenant } from '@/payload-types'
import type { Payload } from 'payload'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { generateCacheTag } from '@/utilities/generateCacheTag'

export async function getTenantPageConfig(
  payload: Payload,
  tenantId: number | string,
): Promise<Tenant | null> {
  try {
    return await payload.findByID({
      collection: 'tenants',
      id: tenantId,
      depth: 1,
    })
  } catch {
    return null
  }
}

export const getCachedTenantPageConfig = (tenantId: number | string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      return getTenantPageConfig(payload, tenantId)
    },
    [`tenant_${tenantId}`],
    {
      tags: [generateCacheTag({ type: 'collection', collection: 'tenants' })],
    },
  )()
