import type { Tenant, User } from '@/payload-types'
import type { Access } from 'payload'

import { isSuperAdmin } from '@/access/isSuperAdmin'
import { getUserTenantIDs } from '@/utils/getUserTenantIDs'

export const createAccess: Access = ({ req }) => {
  if (!req.user) return false

  if (isSuperAdmin(req.user as User)) return true

  // Prevent non-super-admins from creating super-admin users
  if (req.data?.roles?.includes('super-admin')) return false

  const adminTenantAccessIDs = getUserTenantIDs(req.user as User, 'tenant-admin')

  const requestedTenants: Tenant['id'][] =
    req.data?.tenants?.map((t: { tenant: Tenant['id'] }) => t.tenant) ?? []

  // Tenant-admin can only create users for tenants they administer
  return requestedTenants.every((tenantID) => adminTenantAccessIDs.includes(tenantID))
}
