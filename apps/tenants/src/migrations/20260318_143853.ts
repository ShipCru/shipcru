import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tmpl_ovrd_sect_ovrd_ovrds_blog_flds" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_tmpl_ovrd_sect_ovrd_ovrds_blog_flds",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tmpl_ovrd_sect_ovrd_ovrds_metrics_flds" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_tmpl_ovrd_sect_ovrd_ovrds_metrics_flds",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tmpl_ovrd_sect_ovrd_ovrds_cta_flds" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_tmpl_ovrd_sect_ovrd_ovrds_cta_flds",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "search_locales" ALTER COLUMN "embedding" SET DATA TYPE vector(512);
  ALTER TABLE "search" ADD COLUMN "source_slug" varchar;
  ALTER TABLE "search" ADD COLUMN "industry_slug" varchar;
  ALTER TABLE "tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tmpl_ovrd_sect_ovrd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_sect_ovrd_ovrds_blog_flds" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_ovrds_blog_flds_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tmpl_ovrd_sect_ovrd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tmpl_ovrd_sect_ovrd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_sect_ovrd_ovrds_metrics_flds" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_ovrds_metrics_flds_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tmpl_ovrd_sect_ovrd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_sect_ovrd_ovrds_cta_flds" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_ovrds_cta_flds_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tmpl_ovrd_sect_ovrd"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds_order_idx" ON "tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds" USING btree ("order");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds_parent_idx" ON "tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds" USING btree ("parent_id");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_blog_flds_order_idx" ON "tmpl_ovrd_sect_ovrd_ovrds_blog_flds" USING btree ("order");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_blog_flds_parent_idx" ON "tmpl_ovrd_sect_ovrd_ovrds_blog_flds" USING btree ("parent_id");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds_order_idx" ON "tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds" USING btree ("order");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds_parent_idx" ON "tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds" USING btree ("parent_id");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_metrics_flds_order_idx" ON "tmpl_ovrd_sect_ovrd_ovrds_metrics_flds" USING btree ("order");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_metrics_flds_parent_idx" ON "tmpl_ovrd_sect_ovrd_ovrds_metrics_flds" USING btree ("parent_id");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_cta_flds_order_idx" ON "tmpl_ovrd_sect_ovrd_ovrds_cta_flds" USING btree ("order");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_cta_flds_parent_idx" ON "tmpl_ovrd_sect_ovrd_ovrds_cta_flds" USING btree ("parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tmpl_ovrd_sect_ovrd_ovrds_blog_flds" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tmpl_ovrd_sect_ovrd_ovrds_metrics_flds" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tmpl_ovrd_sect_ovrd_ovrds_cta_flds" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds" CASCADE;
  DROP TABLE "tmpl_ovrd_sect_ovrd_ovrds_blog_flds" CASCADE;
  DROP TABLE "tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds" CASCADE;
  DROP TABLE "tmpl_ovrd_sect_ovrd_ovrds_metrics_flds" CASCADE;
  DROP TABLE "tmpl_ovrd_sect_ovrd_ovrds_cta_flds" CASCADE;
  ALTER TABLE "search_locales" ALTER COLUMN "embedding" SET DATA TYPE varchar;
  ALTER TABLE "search" DROP COLUMN "source_slug";
  ALTER TABLE "search" DROP COLUMN "industry_slug";`)
}
