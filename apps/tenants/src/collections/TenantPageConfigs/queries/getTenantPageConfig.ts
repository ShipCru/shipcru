import type { TenantPageConfig } from '@/payload-types'
import type { Payload } from 'payload'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { generateCacheTag } from '@/utilities/generateCacheTag'

export async function getTenantPageConfig(
  payload: Payload,
  tenantId: number | string,
): Promise<TenantPageConfig | null> {
  const result = await payload.find({
    collection: 'tenant-page-configs',
    where: { tenant: { equals: tenantId } },
    limit: 1,
    depth: 1,
  })
  return result.docs[0] ?? null
}

export const getCachedTenantPageConfig = (tenantId: number | string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      return getTenantPageConfig(payload, tenantId)
    },
    [`tenant-page-config_${tenantId}`],
    {
      tags: [generateCacheTag({ type: 'collection', collection: 'tenant-page-configs' })],
    },
  )()
