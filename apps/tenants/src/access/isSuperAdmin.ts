import type { PayloadMcpApiKey, User } from '@/payload-types'
import type { Access } from 'payload'

export const isSuperAdminAccess: Access = ({ req }): boolean => {
  return isSuperAdmin(req.user)
}

export const isSuperAdmin = (user: User | PayloadMcpApiKey | null): boolean => {
  if (!user || !('roles' in user)) return false
  return Boolean(user.roles?.includes('super-admin'))
}
