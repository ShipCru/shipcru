import type { Payload } from 'payload'

export interface ResolvedTenant {
  id: number
  name: string
  slug: string
  domain: string | null
}

export async function resolveTenantByDomain(
  payload: Payload,
  hostname: string,
): Promise<ResolvedTenant | null> {
  const domain = hostname.split(':')[0]

  const result = await payload.find({
    collection: 'tenants',
    where: { domain: { equals: domain } },
    limit: 1,
    depth: 0,
  })

  if (!result.docs[0]) return null

  const doc = result.docs[0]
  return {
    id: doc.id,
    name: doc.name,
    slug: doc.slug,
    domain: doc.domain ?? null,
  }
}

export async function resolveTenantBySlug(
  payload: Payload,
  slug: string,
): Promise<ResolvedTenant | null> {
  const result = await payload.find({
    collection: 'tenants',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })

  if (!result.docs[0]) return null

  const doc = result.docs[0]
  return {
    id: doc.id,
    name: doc.name,
    slug: doc.slug,
    domain: doc.domain ?? null,
  }
}
