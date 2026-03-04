import type { User } from '@/payload-types'
import type { Access } from 'payload'

import { isSuperAdmin } from '@/access/isSuperAdmin'
import { getUserTenantIDs } from '@/utils/getUserTenantIDs'

export const updateAndDeleteAccess: Access = ({ req, id }) => {
  if (!req.user) return false

  // Super-admins can update/delete anyone
  if (isSuperAdmin(req.user as User)) return true

  // Users can update/delete themselves
  if (id && req.user.id === id) return true

  // Tenant-admins can update/delete users in their tenants
  return {
    'tenants.tenant': {
      in: getUserTenantIDs(req.user as User, 'tenant-admin'),
    },
  }
}
