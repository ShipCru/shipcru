import type { User } from '@/payload-types'
import type { Access } from 'payload'

import { isSuperAdmin } from '@/access/isSuperAdmin'
import { getUserTenantIDs } from '@/utils/getUserTenantIDs'

/**
 * Access control for tenant-admin scoped collections.
 * - Super-admins: full access
 * - Tenant-admins: scoped to their tenants
 * - Others: denied
 */
export const tenantAdminAccess: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isSuperAdmin(user as User)) return true

  const tenantIds = getUserTenantIDs(user as User, 'tenant-admin')
  if (!tenantIds.length) return false

  return { tenant: { in: tenantIds } }
}
