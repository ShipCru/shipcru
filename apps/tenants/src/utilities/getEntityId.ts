import type { Config } from '@/payload-types'

type EntityId = Config['collections'][keyof Config['collections']]['id']

export function getEntityId(value: unknown): EntityId | null {
  if (value == null) return null
  if (typeof value === 'number') return value
  if (typeof value === 'object' && 'id' in value && typeof (value as { id: unknown }).id === 'number')
    return (value as { id: number }).id
  return null
}
