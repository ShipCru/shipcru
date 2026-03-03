import type { Access, Where } from 'payload'
import type { User } from '@/payload-types'

import { isSuperAdmin } from '@/access/isSuperAdmin'
import { getUserTenantIDs } from '@/utilities/getUserTenantIDs'

export const readAccess: Access = ({ req, id }) => {
  if (!req.user) return false

  // Users can always read themselves
  if (id && req.user.id === id) return true

  if (isSuperAdmin(req.user as User)) return true

  const adminTenantAccessIDs = getUserTenantIDs(req.user as User, 'tenant-admin')

  if (adminTenantAccessIDs.length > 0) {
    return {
      or: [{ id: { equals: req.user.id } }, { 'tenants.tenant': { in: adminTenantAccessIDs } }],
    } as Where
  }

  // Regular users (editors) can only see themselves
  return { id: { equals: req.user.id } }
}
