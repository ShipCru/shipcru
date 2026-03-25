import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

import * as authSchema from './schema'

export type CockroachDb = ReturnType<typeof drizzle<typeof authSchema>>

export function createCockroachDb(connectionString: string): CockroachDb {
  const pool = new pg.Pool({ connectionString, max: 5, maxUses: 1 })
  return drizzle(pool, { schema: authSchema })
}
