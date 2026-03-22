import type { User } from '@/payload-types'
import type { Access } from 'payload'

import { isSuperAdmin } from '@/access/isSuperAdmin'
import { getUserTenantIDs } from '@/utils/getUserTenantIDs'

/**
 * Access control for the tenants collection itself.
 * - Super-admins: full access
 * - Tenant-admins: scoped to their own tenants via { id: { in: tenantIds } }
 * - Others: denied
 */
export const tenantSelfAccess: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isSuperAdmin(user as User)) return true

  const tenantIds = getUserTenantIDs(user as User, 'tenant-admin')
  if (!tenantIds.length) return false

  return { id: { in: tenantIds } }
}
