import { authenticated } from '@/access/authenticated'
import { isSuperAdminAccess } from '@/access/isSuperAdmin'

/**
 * Reusable access pattern: super-admin can create/update/delete,
 * any authenticated user can read.
 */
export const superAdminCrud = {
  create: isSuperAdminAccess,
  read: authenticated,
  update: isSuperAdminAccess,
  delete: isSuperAdminAccess,
}
