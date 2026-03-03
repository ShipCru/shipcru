import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'

import { isSuperAdmin } from '@/access/isSuperAdmin'
import { getUserTenantIDs } from '@/utilities/getUserTenantIDs'
import type { User } from '@/payload-types'

export const pluginMultiTenant = multiTenantPlugin({
  collections: {
    pages: {},
    media: {},
  },
  tenantField: {
    access: {
      read: () => true,
      update: ({ req }) => {
        if (isSuperAdmin(req.user as User)) return true
        return getUserTenantIDs(req.user as User).length > 0
      },
    },
  },
  tenantsArrayField: {
    includeDefaultField: false,
  },
  userHasAccessToAllTenants: (user) => isSuperAdmin(user as User),
  useTenantsCollectionAccess: false,
  useUsersTenantFilter: false,
  useTenantsListFilter: true,
})
