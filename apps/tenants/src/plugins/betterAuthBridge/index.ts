import type { BetterAuthInstance } from './betterAuth'
import type { CockroachDb } from './db'
import type { Config, Plugin } from 'payload'

import { createBetterAuthInstance } from './betterAuth'
import { createCockroachDb } from './db'

export interface BetterAuthBridgeConfig {
  cockroachDbUrl: string
}

let _auth: BetterAuthInstance | null = null
let _db: CockroachDb | null = null

export function getAuth() {
  if (!_auth) throw new Error('betterAuthBridge plugin not initialized')
  return _auth
}

export function getCockroachDb() {
  if (!_db) throw new Error('betterAuthBridge plugin not initialized')
  return _db
}

const externalIdField = {
  name: 'externalId',
  type: 'text' as const,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar' as const,
    readOnly: true,
    description: 'CockroachDB user ID (set automatically on SSO login)',
  },
}

export function betterAuthBridge(pluginConfig: BetterAuthBridgeConfig): Plugin {
  return (config: Config): Config => {
    _db = createCockroachDb(pluginConfig.cockroachDbUrl)
    _auth = createBetterAuthInstance(_db)

    const collections = (config.collections ?? []).map((c) => {
      if (typeof c === 'string' || c.slug !== 'users') return c
      return { ...c, fields: [...c.fields, externalIdField] }
    })

    const existingBeforeLogin = config.admin?.components?.beforeLogin ?? []

    return {
      ...config,
      collections,
      admin: {
        ...config.admin,
        components: {
          ...config.admin?.components,
          beforeLogin: [
            ...existingBeforeLogin,
            '@/plugins/betterAuthBridge/components/BetterAuthLogin',
          ],
        },
      },
    }
  }
}
