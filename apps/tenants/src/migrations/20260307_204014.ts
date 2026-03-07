import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`industry_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industry_categories_slug_idx\` ON \`industry_categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`industry_categories_updated_at_idx\` ON \`industry_categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`industry_categories_created_at_idx\` ON \`industry_categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`industries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`category_id\` integer,
  	\`description\` text,
  	\`meta_robots\` text DEFAULT 'index',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`industry_categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industries_slug_idx\` ON \`industries\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`industries_category_idx\` ON \`industries\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`industries_updated_at_idx\` ON \`industries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`industries_created_at_idx\` ON \`industries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`industries_locales\` (
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_meta_meta_image_idx\` ON \`industries_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`industries_locales_locale_parent_id_unique\` ON \`industries_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`job_titles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`meta_robots\` text DEFAULT 'index',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`job_titles_slug_idx\` ON \`job_titles\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`job_titles_updated_at_idx\` ON \`job_titles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`job_titles_created_at_idx\` ON \`job_titles\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`job_titles_locales\` (
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_titles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`job_titles_meta_meta_image_idx\` ON \`job_titles_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`job_titles_locales_locale_parent_id_unique\` ON \`job_titles_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`job_titles_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`industries_id\` integer,
  	\`skills_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`job_titles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`industries_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`skills_id\`) REFERENCES \`skills\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`job_titles_rels_order_idx\` ON \`job_titles_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`job_titles_rels_parent_idx\` ON \`job_titles_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`job_titles_rels_path_idx\` ON \`job_titles_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`job_titles_rels_industries_id_idx\` ON \`job_titles_rels\` (\`industries_id\`);`)
  await db.run(sql`CREATE INDEX \`job_titles_rels_skills_id_idx\` ON \`job_titles_rels\` (\`skills_id\`);`)
  await db.run(sql`CREATE TABLE \`skills\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`category\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`skills_name_idx\` ON \`skills\` (\`name\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`skills_slug_idx\` ON \`skills\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`skills_updated_at_idx\` ON \`skills\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`skills_created_at_idx\` ON \`skills\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`content_variations_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`weight\` numeric DEFAULT 1,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`content_variations_options_order_idx\` ON \`content_variations_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`content_variations_options_parent_id_idx\` ON \`content_variations_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`content_variations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`assignment_key\` text,
  	\`parent_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`content_variations_assignment_key_idx\` ON \`content_variations\` (\`assignment_key\`);`)
  await db.run(sql`CREATE INDEX \`content_variations_parent_idx\` ON \`content_variations\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`content_variations_updated_at_idx\` ON \`content_variations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`content_variations_created_at_idx\` ON \`content_variations\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`industry_categories_id\` integer REFERENCES industry_categories(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`industries_id\` integer REFERENCES industries(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`job_titles_id\` integer REFERENCES job_titles(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`skills_id\` integer REFERENCES skills(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`content_variations_id\` integer REFERENCES content_variations(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_industry_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`industry_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_industries_id_idx\` ON \`payload_locked_documents_rels\` (\`industries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_job_titles_id_idx\` ON \`payload_locked_documents_rels\` (\`job_titles_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_skills_id_idx\` ON \`payload_locked_documents_rels\` (\`skills_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_content_variations_id_idx\` ON \`payload_locked_documents_rels\` (\`content_variations_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`industry_categories\`;`)
  await db.run(sql`DROP TABLE \`industries\`;`)
  await db.run(sql`DROP TABLE \`industries_locales\`;`)
  await db.run(sql`DROP TABLE \`job_titles\`;`)
  await db.run(sql`DROP TABLE \`job_titles_locales\`;`)
  await db.run(sql`DROP TABLE \`job_titles_rels\`;`)
  await db.run(sql`DROP TABLE \`skills\`;`)
  await db.run(sql`DROP TABLE \`content_variations_options\`;`)
  await db.run(sql`DROP TABLE \`content_variations\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`tenants_id\` integer,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tenants_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "tenants_id", "pages_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "tenants_id", "pages_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tenants_id_idx\` ON \`payload_locked_documents_rels\` (\`tenants_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
}
