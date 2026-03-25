import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ADD COLUMN "external_id" varchar;
  CREATE UNIQUE INDEX "users_external_id_idx" ON "users" USING btree ("external_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "users_external_id_idx";
  ALTER TABLE "users" DROP COLUMN "external_id";`)
}
