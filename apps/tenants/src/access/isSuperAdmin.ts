import type { User } from '@/payload-types'
import type { Access } from 'payload'

export const isSuperAdminAccess: Access = ({ req }): boolean => {
  return isSuperAdmin(req.user as User | null)
}

export const isSuperAdmin = (user: User | null): boolean => {
  return Boolean(user?.roles?.includes('super-admin'))
}
