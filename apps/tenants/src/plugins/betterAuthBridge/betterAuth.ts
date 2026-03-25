import type { CockroachDb } from './db'

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { schema } from './schema'

export function createBetterAuthInstance(db: CockroachDb) {
  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
    database: drizzleAdapter(db, { provider: 'pg', schema, usePlural: true }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 6,
      maxPasswordLength: 128,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 21, // 21 days — match Rock
      updateAge: 60 * 60 * 24, // refresh every 24h
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // 5 minutes
      },
    },
    databaseHooks: {
      user: {
        create: {
          before: async () => {
            throw new Error('User registration is not available on CMS. Use your existing account.')
          },
        },
      },
    },
  })
}

export type BetterAuthInstance = ReturnType<typeof createBetterAuthInstance>
