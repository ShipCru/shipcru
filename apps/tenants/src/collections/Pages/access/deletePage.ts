import type { Access, Where } from 'payload'
import type { User } from '@/payload-types'

import { isSuperAdmin } from '@/access/isSuperAdmin'
import { getUserTenantIDs } from '@/utilities/getUserTenantIDs'

export const deletePageAccess: Access = ({ req }) => {
  if (!req.user) return false

  const user = req.user as User

  // Super-admin can delete any page
  if (isSuperAdmin(user)) return true

  const adminTenantIDs = getUserTenantIDs(user, 'tenant-admin')
  const editorTenantIDs = getUserTenantIDs(user, 'editor')

  const conditions: Where[] = []

  // Tenant-admins can delete any page in their tenants
  if (adminTenantIDs.length > 0) {
    conditions.push({ tenant: { in: adminTenantIDs } })
  }

  // Editors can delete their own pages in their tenants
  if (editorTenantIDs.length > 0) {
    conditions.push({
      and: [{ tenant: { in: editorTenantIDs } }, { author: { equals: user.id } }],
    })
  }

  if (conditions.length === 0) return false
  if (conditions.length === 1) return conditions[0]

  return { or: conditions } as Where
}
