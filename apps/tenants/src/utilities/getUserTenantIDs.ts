import type { Tenant, User } from '@/payload-types'

import { extractID } from './extractID'

export const getUserTenantIDs = (
  user: User | null,
  role?: NonNullable<User['tenants']>[number]['roles'][number],
): Tenant['id'][] => {
  if (!user) return []

  return (
    user?.tenants?.reduce<Tenant['id'][]>((acc, { roles, tenant }) => {
      if (role && !roles.includes(role)) return acc
      if (tenant) acc.push(extractID(tenant))
      return acc
    }, []) || []
  )
}
