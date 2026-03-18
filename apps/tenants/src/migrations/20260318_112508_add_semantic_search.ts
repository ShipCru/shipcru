import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "vector"`)
  await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "pg_trgm"`)

  await db.execute(sql`
    ALTER TABLE "search_locales"
    ADD COLUMN IF NOT EXISTS "embedding" vector(512)
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "search_locales_embedding_idx"
    ON "search_locales"
    USING hnsw ("embedding" vector_cosine_ops)
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "search_locales_title_trgm_idx"
    ON "search_locales"
    USING gin ("title" gin_trgm_ops)
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP INDEX IF EXISTS "search_locales_title_trgm_idx"`)
  await db.execute(sql`DROP INDEX IF EXISTS "search_locales_embedding_idx"`)
  await db.execute(sql`ALTER TABLE "search_locales" DROP COLUMN IF EXISTS "embedding"`)
}
