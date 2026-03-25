import type { User } from '@/payload-types'

type PayloadRoles = NonNullable<User['roles']>

const ADMIN_PATTERNS = ['users.*', 'customers.*', '*.*']

export function mapRockPermissions(permissions: string[] | null | undefined): PayloadRoles {
  if (!permissions || permissions.length === 0) return []

  const isAdmin = permissions.some(
    (p) => ADMIN_PATTERNS.includes(p) || p === '*',
  )

  if (isAdmin) return ['super-admin']

  // --- Extension point ---
  // Add mappings here when Rock introduces CMS-specific permissions.
  // Example:
  //   if (permissions.includes('cms.edit')) return ['editor']
  //   if (permissions.includes('cms.tenant-admin')) return ['tenant-admin']

  return []
}
