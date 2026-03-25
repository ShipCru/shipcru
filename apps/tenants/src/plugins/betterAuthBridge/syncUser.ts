import type { User } from '@/payload-types'
import type { Payload, PayloadRequest } from 'payload'

import { mapRockPermissions } from './mapPermissions'

interface CockroachUser {
  id: string
  email: string
  name: string
  permissions: string[] | null
}

export async function syncShadowUser(
  payload: Payload,
  crdbUser: CockroachUser,
  req?: PayloadRequest,
): Promise<User> {
  const roles = mapRockPermissions(crdbUser.permissions)

  const existing = await payload.find({
    collection: 'users',
    where: { externalId: { equals: crdbUser.id } },
    limit: 1,
    depth: 0,
    req,
  })

  if (existing.docs.length > 0) {
    const doc = existing.docs[0] as User
    const needsUpdate =
      doc.email !== crdbUser.email ||
      doc.name !== crdbUser.name ||
      JSON.stringify(doc.roles) !== JSON.stringify(roles)

    if (needsUpdate) {
      const updated = await payload.update({
        collection: 'users',
        id: doc.id,
        data: {
          email: crdbUser.email,
          name: crdbUser.name,
          roles,
          // tenants array is intentionally NOT included — preserved as-is
        },
        req,
      })
      return updated as User
    }

    return doc
  }

  // New shadow user — random password satisfies Payload's auth requirement
  try {
    const created = await payload.create({
      collection: 'users',
      data: {
        email: crdbUser.email,
        name: crdbUser.name,
        externalId: crdbUser.id,
        roles,
        password: crypto.randomUUID() + crypto.randomUUID(),
      },
      req,
    })
    payload.logger.info(`Shadow user created for ${crdbUser.email}`)
    return created as User
  } catch (error: unknown) {
    // Race condition: another request created the user concurrently
    // PostgreSQL unique violation error code
    const pgError = error as { code?: string }
    if (pgError.code === '23505') {
      const retried = await payload.find({
        collection: 'users',
        where: { externalId: { equals: crdbUser.id } },
        limit: 1,
        depth: 0,
        req,
      })
      if (retried.docs.length > 0) return retried.docs[0] as User
    }
    throw error
  }
}
