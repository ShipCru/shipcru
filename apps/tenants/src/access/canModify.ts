import type { User } from '@/payload-types'
import type { AccessArgs } from 'payload'

import { isSuperAdmin } from '@/access/isSuperAdmin'
import { getUserTenantIDs } from '@/utils/getUserTenantIDs'

export const canModify = ({ req, data }: AccessArgs) => {
  if (!req.user) {
    return false
  }

  if (isSuperAdmin(req.user as User)) {
    return true
  }

  const userTenants = getUserTenantIDs(req.user as User)
  const requestTenant = data?.tenant as number

  return typeof requestTenant === 'number' && userTenants.includes(requestTenant)
}
