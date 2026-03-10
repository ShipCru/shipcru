import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_roles_order_idx\` ON \`users_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_roles_parent_idx\` ON \`users_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users_tenants_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users_tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_tenants_roles_order_idx\` ON \`users_tenants_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_tenants_roles_parent_idx\` ON \`users_tenants_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users_tenants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_tenants_order_idx\` ON \`users_tenants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_tenants_parent_id_idx\` ON \`users_tenants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`users_tenants_tenant_idx\` ON \`users_tenants\` (\`tenant_id\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer,
  	\`alt\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`media_tenant_idx\` ON \`media\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`tenants_supported_locales\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tenants_supported_locales_order_idx\` ON \`tenants_supported_locales\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tenants_supported_locales_parent_idx\` ON \`tenants_supported_locales\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`tenants\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`domain\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tenants_slug_idx\` ON \`tenants\` (\`slug\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenants_domain_idx\` ON \`tenants\` (\`domain\`);`)
  await db.run(sql`CREATE INDEX \`tenants_updated_at_idx\` ON \`tenants\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tenants_created_at_idx\` ON \`tenants\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_split_review_avatars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero_split\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_review_avatars_order_idx\` ON \`pages_blocks_hero_split_review_avatars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_review_avatars_parent_id_idx\` ON \`pages_blocks_hero_split_review_avatars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_review_avatars_image_idx\` ON \`pages_blocks_hero_split_review_avatars\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_split\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_variation_set_id\` integer,
  	\`image_id\` integer,
  	\`review_rating\` text DEFAULT '5.0',
  	\`block_name\` text,
  	FOREIGN KEY (\`heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_order_idx\` ON \`pages_blocks_hero_split\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_parent_id_idx\` ON \`pages_blocks_hero_split\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_path_idx\` ON \`pages_blocks_hero_split\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_heading_heading_variation_set_idx\` ON \`pages_blocks_hero_split\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_description_description_variatio_idx\` ON \`pages_blocks_hero_split\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_image_idx\` ON \`pages_blocks_hero_split\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_split_locales\` (
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Get started',
  	\`form_helper_text\` text DEFAULT 'We care about your data in our privacy policy.',
  	\`review_text\` text DEFAULT 'from 200+ reviews',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero_split\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_hero_split_locales_locale_parent_id_unique\` ON \`pages_blocks_hero_split_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_blog_articles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`thumbnail_id\` integer,
  	\`published_at\` text,
  	\`author_image_id\` integer,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_blog\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_articles_order_idx\` ON \`pages_blocks_blog_articles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_articles_parent_id_idx\` ON \`pages_blocks_blog_articles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_articles_thumbnail_idx\` ON \`pages_blocks_blog_articles\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_articles_author_image_idx\` ON \`pages_blocks_blog_articles\` (\`author_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_blog_articles_locales\` (
  	\`title\` text,
  	\`summary\` text,
  	\`category_name\` text,
  	\`reading_time\` text,
  	\`author_name\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_blog_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_blog_articles_locales_locale_parent_id_unique\` ON \`pages_blocks_blog_articles_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_blog\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_variation_set_id\` integer,
  	\`section_id\` text,
  	\`section_group\` text DEFAULT 'test',
  	\`block_name\` text,
  	FOREIGN KEY (\`heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_order_idx\` ON \`pages_blocks_blog\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_parent_id_idx\` ON \`pages_blocks_blog\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_path_idx\` ON \`pages_blocks_blog\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_heading_heading_variation_set_idx\` ON \`pages_blocks_blog\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_description_description_variation_set_idx\` ON \`pages_blocks_blog\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_blog_locales\` (
  	\`label\` text DEFAULT 'Blog',
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Subscribe',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_blog\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_blog_locales_locale_parent_id_unique\` ON \`pages_blocks_blog_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials_reviews\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`author_image_id\` integer,
  	\`company_name\` text,
  	\`company_logo_id\` integer,
  	\`company_logo_dark_id\` integer,
  	FOREIGN KEY (\`author_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`company_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`company_logo_dark_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_reviews_order_idx\` ON \`pages_blocks_testimonials_reviews\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_reviews_parent_id_idx\` ON \`pages_blocks_testimonials_reviews\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_reviews_author_image_idx\` ON \`pages_blocks_testimonials_reviews\` (\`author_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_reviews_company_logo_idx\` ON \`pages_blocks_testimonials_reviews\` (\`company_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_reviews_company_logo_dark_idx\` ON \`pages_blocks_testimonials_reviews\` (\`company_logo_dark_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials_reviews_locales\` (
  	\`quote\` text,
  	\`author_name\` text,
  	\`author_title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonials_reviews\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_testimonials_reviews_locales_locale_parent_id_u\` ON \`pages_blocks_testimonials_reviews_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_variation_set_id\` integer,
  	\`section_id\` text,
  	\`section_group\` text DEFAULT 'test',
  	\`block_name\` text,
  	FOREIGN KEY (\`heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_order_idx\` ON \`pages_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_parent_id_idx\` ON \`pages_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_path_idx\` ON \`pages_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_heading_heading_variation_set_idx\` ON \`pages_blocks_testimonials\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_description_description_variat_idx\` ON \`pages_blocks_testimonials\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials_locales\` (
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_testimonials_locales_locale_parent_id_unique\` ON \`pages_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_metrics_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`cta_link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_metrics_metrics_order_idx\` ON \`pages_blocks_metrics_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_metrics_metrics_parent_id_idx\` ON \`pages_blocks_metrics_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_metrics_metrics_locales\` (
  	\`value\` text,
  	\`label\` text,
  	\`description\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_metrics_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_metrics_metrics_locales_locale_parent_id_unique\` ON \`pages_blocks_metrics_metrics_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_variation_set_id\` integer,
  	\`section_id\` text,
  	\`section_group\` text DEFAULT 'test',
  	\`block_name\` text,
  	FOREIGN KEY (\`heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_metrics_order_idx\` ON \`pages_blocks_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_metrics_parent_id_idx\` ON \`pages_blocks_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_metrics_path_idx\` ON \`pages_blocks_metrics\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_metrics_heading_heading_variation_set_idx\` ON \`pages_blocks_metrics\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_metrics_description_description_variation_s_idx\` ON \`pages_blocks_metrics\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_metrics_locales\` (
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_metrics_locales_locale_parent_id_unique\` ON \`pages_blocks_metrics_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` integer,
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_order_idx\` ON \`pages_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_parent_id_idx\` ON \`pages_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_locale_idx\` ON \`pages_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_doc_idx\` ON \`pages_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer,
  	\`meta_robots\` text DEFAULT 'index',
  	\`published_at\` text,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`author_id\` integer,
  	\`parent_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_tenant_idx\` ON \`pages\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_author_idx\` ON \`pages\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_parent_idx\` ON \`pages\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`pages_locales\` (
  	\`title\` text,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_locales_locale_parent_id_unique\` ON \`pages_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_split_review_avatars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero_split\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_review_avatars_order_idx\` ON \`_pages_v_blocks_hero_split_review_avatars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_review_avatars_parent_id_idx\` ON \`_pages_v_blocks_hero_split_review_avatars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_review_avatars_image_idx\` ON \`_pages_v_blocks_hero_split_review_avatars\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_split\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_variation_set_id\` integer,
  	\`image_id\` integer,
  	\`review_rating\` text DEFAULT '5.0',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_order_idx\` ON \`_pages_v_blocks_hero_split\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_parent_id_idx\` ON \`_pages_v_blocks_hero_split\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_path_idx\` ON \`_pages_v_blocks_hero_split\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_heading_heading_variation_set_idx\` ON \`_pages_v_blocks_hero_split\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_description_description_varia_idx\` ON \`_pages_v_blocks_hero_split\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_image_idx\` ON \`_pages_v_blocks_hero_split\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_split_locales\` (
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Get started',
  	\`form_helper_text\` text DEFAULT 'We care about your data in our privacy policy.',
  	\`review_text\` text DEFAULT 'from 200+ reviews',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero_split\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_hero_split_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_hero_split_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_blog_articles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`thumbnail_id\` integer,
  	\`published_at\` text,
  	\`author_image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_blog\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_blog_articles_order_idx\` ON \`_pages_v_blocks_blog_articles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_blog_articles_parent_id_idx\` ON \`_pages_v_blocks_blog_articles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_blog_articles_thumbnail_idx\` ON \`_pages_v_blocks_blog_articles\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_blog_articles_author_image_idx\` ON \`_pages_v_blocks_blog_articles\` (\`author_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_blog_articles_locales\` (
  	\`title\` text,
  	\`summary\` text,
  	\`category_name\` text,
  	\`reading_time\` text,
  	\`author_name\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_blog_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_blog_articles_locales_locale_parent_id_uniqu\` ON \`_pages_v_blocks_blog_articles_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_blog\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_variation_set_id\` integer,
  	\`section_id\` text,
  	\`section_group\` text DEFAULT 'test',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_blog_order_idx\` ON \`_pages_v_blocks_blog\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_blog_parent_id_idx\` ON \`_pages_v_blocks_blog\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_blog_path_idx\` ON \`_pages_v_blocks_blog\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_blog_heading_heading_variation_set_idx\` ON \`_pages_v_blocks_blog\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_blog_description_description_variation_s_idx\` ON \`_pages_v_blocks_blog\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_blog_locales\` (
  	\`label\` text DEFAULT 'Blog',
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Subscribe',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_blog\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_blog_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_blog_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonials_reviews\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`author_image_id\` integer,
  	\`company_name\` text,
  	\`company_logo_id\` integer,
  	\`company_logo_dark_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`author_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`company_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`company_logo_dark_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_reviews_order_idx\` ON \`_pages_v_blocks_testimonials_reviews\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_reviews_parent_id_idx\` ON \`_pages_v_blocks_testimonials_reviews\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_reviews_author_image_idx\` ON \`_pages_v_blocks_testimonials_reviews\` (\`author_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_reviews_company_logo_idx\` ON \`_pages_v_blocks_testimonials_reviews\` (\`company_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_reviews_company_logo_dark_idx\` ON \`_pages_v_blocks_testimonials_reviews\` (\`company_logo_dark_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonials_reviews_locales\` (
  	\`quote\` text,
  	\`author_name\` text,
  	\`author_title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_testimonials_reviews\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_testimonials_reviews_locales_locale_parent_i\` ON \`_pages_v_blocks_testimonials_reviews_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_variation_set_id\` integer,
  	\`section_id\` text,
  	\`section_group\` text DEFAULT 'test',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_order_idx\` ON \`_pages_v_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_parent_id_idx\` ON \`_pages_v_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_path_idx\` ON \`_pages_v_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_heading_heading_variation_s_idx\` ON \`_pages_v_blocks_testimonials\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_description_description_var_idx\` ON \`_pages_v_blocks_testimonials\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonials_locales\` (
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_testimonials_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_metrics_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`cta_link\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_metrics_metrics_order_idx\` ON \`_pages_v_blocks_metrics_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_metrics_metrics_parent_id_idx\` ON \`_pages_v_blocks_metrics_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_metrics_metrics_locales\` (
  	\`value\` text,
  	\`label\` text,
  	\`description\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_metrics_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_metrics_metrics_locales_locale_parent_id_uni\` ON \`_pages_v_blocks_metrics_metrics_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_variation_set_id\` integer,
  	\`section_id\` text,
  	\`section_group\` text DEFAULT 'test',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_metrics_order_idx\` ON \`_pages_v_blocks_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_metrics_parent_id_idx\` ON \`_pages_v_blocks_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_metrics_path_idx\` ON \`_pages_v_blocks_metrics\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_metrics_heading_heading_variation_set_idx\` ON \`_pages_v_blocks_metrics\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_metrics_description_description_variatio_idx\` ON \`_pages_v_blocks_metrics\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_metrics_locales\` (
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_metrics_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_metrics_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`doc_id\` integer,
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_order_idx\` ON \`_pages_v_version_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_parent_id_idx\` ON \`_pages_v_version_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_locale_idx\` ON \`_pages_v_version_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_doc_idx\` ON \`_pages_v_version_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_tenant_id\` integer,
  	\`version_meta_robots\` text DEFAULT 'index',
  	\`version_published_at\` text,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_author_id\` integer,
  	\`version_parent_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_tenant_idx\` ON \`_pages_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_author_idx\` ON \`_pages_v\` (\`version_author_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_parent_idx\` ON \`_pages_v\` (\`version_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_snapshot_idx\` ON \`_pages_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_published_locale_idx\` ON \`_pages_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_locales\` (
  	\`version_title\` text,
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` integer,
  	\`version_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_locales_locale_parent_id_unique\` ON \`_pages_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industry_categories_slug_idx\` ON \`industry_categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`industry_categories_updated_at_idx\` ON \`industry_categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`industry_categories_created_at_idx\` ON \`industry_categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`industry_categories_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industry_categories_locales_locale_parent_id_unique\` ON \`industry_categories_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`category_id\` integer,
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
  	\`name\` text NOT NULL,
  	\`description\` text,
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
  	\`name\` text NOT NULL,
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
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`category\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`skills_slug_idx\` ON \`skills\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`skills_updated_at_idx\` ON \`skills\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`skills_created_at_idx\` ON \`skills\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`skills_locales\` (
  	\`name\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`skills\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`skills_name_idx\` ON \`skills_locales\` (\`name\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`skills_locales_locale_parent_id_unique\` ON \`skills_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`content_variations_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`weight\` numeric DEFAULT 1,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`content_variations_options_order_idx\` ON \`content_variations_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`content_variations_options_parent_id_idx\` ON \`content_variations_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`content_variations_options_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`content_variations_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`content_variations_options_locales_locale_parent_id_unique\` ON \`content_variations_options_locales\` (\`_locale\`,\`_parent_id\`);`)
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
  await db.run(sql`CREATE TABLE \`word_form_sets\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`type\` text NOT NULL,
  	\`tenant_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`word_form_sets_tenant_idx\` ON \`word_form_sets\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`word_form_sets_updated_at_idx\` ON \`word_form_sets\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`word_form_sets_created_at_idx\` ON \`word_form_sets\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`word_form_sets_locales\` (
  	\`rw_singular\` text,
  	\`rw_plural\` text,
  	\`rw_capitalized\` text,
  	\`rw_abbreviated\` text,
  	\`rw_abbreviatedcapitalized\` text,
  	\`rw_pluralcapitalized\` text,
  	\`rw_pluralabbreviated\` text,
  	\`rw_pluralabbreviatedcapitalized\` text,
  	\`v_worder\` text,
  	\`v_singular\` text,
  	\`v_capitalized\` text,
  	\`v_wordercapitalized\` text,
  	\`v_wording\` text,
  	\`v_wordingcapitalized\` text,
  	\`v_past\` text,
  	\`v_pastcapitalized\` text,
  	\`adj_singular\` text,
  	\`adj_capitalized\` text,
  	\`adj_adverb\` text,
  	\`adj_adverbcapitalized\` text,
  	\`cw_singular\` text,
  	\`cw_plural\` text,
  	\`cw_capitalized\` text,
  	\`cw_pluralcapitalized\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`word_form_sets\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`word_form_sets_locales_locale_parent_id_unique\` ON \`word_form_sets_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`enum_tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tmpl_ovrd_sect_ovrd\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`enum_tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds_order_idx\` ON \`enum_tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`enum_tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds_parent_idx\` ON \`enum_tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`enum_tmpl_ovrd_sect_ovrd_ovrds_blog_flds\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tmpl_ovrd_sect_ovrd\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`enum_tmpl_ovrd_sect_ovrd_ovrds_blog_flds_order_idx\` ON \`enum_tmpl_ovrd_sect_ovrd_ovrds_blog_flds\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`enum_tmpl_ovrd_sect_ovrd_ovrds_blog_flds_parent_idx\` ON \`enum_tmpl_ovrd_sect_ovrd_ovrds_blog_flds\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`enum_tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tmpl_ovrd_sect_ovrd\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`enum_tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds_order_idx\` ON \`enum_tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`enum_tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds_parent_idx\` ON \`enum_tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`enum_tmpl_ovrd_sect_ovrd_ovrds_metrics_flds\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tmpl_ovrd_sect_ovrd\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`enum_tmpl_ovrd_sect_ovrd_ovrds_metrics_flds_order_idx\` ON \`enum_tmpl_ovrd_sect_ovrd_ovrds_metrics_flds\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`enum_tmpl_ovrd_sect_ovrd_ovrds_metrics_flds_parent_idx\` ON \`enum_tmpl_ovrd_sect_ovrd_ovrds_metrics_flds\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`tmpl_ovrd_sect_ovrd\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_block_type\` text,
  	\`action\` text DEFAULT 'override-props',
  	\`locked\` integer DEFAULT false,
  	\`section_group\` text,
  	\`ovrds_herosplit_heading_mode\` text DEFAULT 'fixed',
  	\`ovrds_herosplit_heading_variation_set_id\` integer,
  	\`ovrds_herosplit_description_mode\` text DEFAULT 'fixed',
  	\`ovrds_herosplit_description_variation_set_id\` integer,
  	\`ovrds_blog_heading_mode\` text DEFAULT 'fixed',
  	\`ovrds_blog_heading_variation_set_id\` integer,
  	\`ovrds_blog_description_mode\` text DEFAULT 'fixed',
  	\`ovrds_blog_description_variation_set_id\` integer,
  	\`ovrds_testimonials_heading_mode\` text DEFAULT 'fixed',
  	\`ovrds_testimonials_heading_variation_set_id\` integer,
  	\`ovrds_testimonials_description_mode\` text DEFAULT 'fixed',
  	\`ovrds_testimonials_description_variation_set_id\` integer,
  	\`ovrds_metrics_heading_mode\` text DEFAULT 'fixed',
  	\`ovrds_metrics_heading_variation_set_id\` integer,
  	\`ovrds_metrics_description_mode\` text DEFAULT 'fixed',
  	\`ovrds_metrics_description_variation_set_id\` integer,
  	\`advanced_overrides\` text,
  	FOREIGN KEY (\`ovrds_herosplit_heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ovrds_herosplit_description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ovrds_blog_heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ovrds_blog_description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ovrds_testimonials_heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ovrds_testimonials_description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ovrds_metrics_heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ovrds_metrics_description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tmpl_ovrd\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_sect_ovrd_order_idx\` ON \`tmpl_ovrd_sect_ovrd\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_sect_ovrd_parent_id_idx\` ON \`tmpl_ovrd_sect_ovrd\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_sect_ovrd_ovrds_herosplit_heading_ovrds_herosp_idx\` ON \`tmpl_ovrd_sect_ovrd\` (\`ovrds_herosplit_heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_sect_ovrd_ovrds_herosplit_description_ovrds_he_idx\` ON \`tmpl_ovrd_sect_ovrd\` (\`ovrds_herosplit_description_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_sect_ovrd_ovrds_blog_heading_ovrds_blog_headin_idx\` ON \`tmpl_ovrd_sect_ovrd\` (\`ovrds_blog_heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_sect_ovrd_ovrds_blog_description_ovrds_blog_de_idx\` ON \`tmpl_ovrd_sect_ovrd\` (\`ovrds_blog_description_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_sect_ovrd_ovrds_testimonials_heading_ovrds_tes_idx\` ON \`tmpl_ovrd_sect_ovrd\` (\`ovrds_testimonials_heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_sect_ovrd_ovrds_testimonials_description_ovrds_idx\` ON \`tmpl_ovrd_sect_ovrd\` (\`ovrds_testimonials_description_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_sect_ovrd_ovrds_metrics_heading_ovrds_metrics__idx\` ON \`tmpl_ovrd_sect_ovrd\` (\`ovrds_metrics_heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_sect_ovrd_ovrds_metrics_description_ovrds_metr_idx\` ON \`tmpl_ovrd_sect_ovrd\` (\`ovrds_metrics_description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`tmpl_ovrd_sect_ovrd_locales\` (
  	\`ovrds_herosplit_heading_fixed_text\` text,
  	\`ovrds_herosplit_description_fixed_text\` text,
  	\`ovrds_blog_heading_fixed_text\` text,
  	\`ovrds_blog_description_fixed_text\` text,
  	\`ovrds_testimonials_heading_fixed_text\` text,
  	\`ovrds_testimonials_description_fixed_text\` text,
  	\`ovrds_metrics_heading_fixed_text\` text,
  	\`ovrds_metrics_description_fixed_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tmpl_ovrd_sect_ovrd\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tmpl_ovrd_sect_ovrd_locales_locale_parent_id_unique\` ON \`tmpl_ovrd_sect_ovrd_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`tmpl_ovrd\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`tenant_id\` integer,
  	\`target_type\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_tenant_idx\` ON \`tmpl_ovrd\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_updated_at_idx\` ON \`tmpl_ovrd\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_created_at_idx\` ON \`tmpl_ovrd\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tmpl_ovrd_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`industry_categories_id\` integer,
  	\`industries_id\` integer,
  	\`job_titles_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tmpl_ovrd\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`industry_categories_id\`) REFERENCES \`industry_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`industries_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`job_titles_id\`) REFERENCES \`job_titles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_rels_order_idx\` ON \`tmpl_ovrd_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_rels_parent_idx\` ON \`tmpl_ovrd_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_rels_path_idx\` ON \`tmpl_ovrd_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_rels_industry_categories_id_idx\` ON \`tmpl_ovrd_rels\` (\`industry_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_rels_industries_id_idx\` ON \`tmpl_ovrd_rels\` (\`industries_id\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_rels_job_titles_id_idx\` ON \`tmpl_ovrd_rels\` (\`job_titles_id\`);`)
  await db.run(sql`CREATE TABLE \`tenant_page_configs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer,
  	\`mode\` text DEFAULT 'all',
  	\`job_title_mode\` text DEFAULT 'all-in-industries',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_page_configs_tenant_idx\` ON \`tenant_page_configs\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`tenant_page_configs_updated_at_idx\` ON \`tenant_page_configs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tenant_page_configs_created_at_idx\` ON \`tenant_page_configs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tenant_page_configs_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`industries_id\` integer,
  	\`job_titles_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tenant_page_configs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`industries_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`job_titles_id\`) REFERENCES \`job_titles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tenant_page_configs_rels_order_idx\` ON \`tenant_page_configs_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tenant_page_configs_rels_parent_idx\` ON \`tenant_page_configs_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tenant_page_configs_rels_path_idx\` ON \`tenant_page_configs_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tenant_page_configs_rels_industries_id_idx\` ON \`tenant_page_configs_rels\` (\`industries_id\`);`)
  await db.run(sql`CREATE INDEX \`tenant_page_configs_rels_job_titles_id_idx\` ON \`tenant_page_configs_rels\` (\`job_titles_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs_log\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`executed_at\` text NOT NULL,
  	\`completed_at\` text NOT NULL,
  	\`task_slug\` text NOT NULL,
  	\`task_i_d\` text NOT NULL,
  	\`input\` text,
  	\`output\` text,
  	\`state\` text NOT NULL,
  	\`error\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payload_jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_order_idx\` ON \`payload_jobs_log\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_parent_id_idx\` ON \`payload_jobs_log\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`input\` text,
  	\`completed_at\` text,
  	\`total_tried\` numeric DEFAULT 0,
  	\`has_error\` integer DEFAULT false,
  	\`error\` text,
  	\`task_slug\` text,
  	\`queue\` text DEFAULT 'default',
  	\`wait_until\` text,
  	\`processing\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_completed_at_idx\` ON \`payload_jobs\` (\`completed_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_total_tried_idx\` ON \`payload_jobs\` (\`total_tried\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_has_error_idx\` ON \`payload_jobs\` (\`has_error\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_task_slug_idx\` ON \`payload_jobs\` (\`task_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_queue_idx\` ON \`payload_jobs\` (\`queue\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_wait_until_idx\` ON \`payload_jobs\` (\`wait_until\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_processing_idx\` ON \`payload_jobs\` (\`processing\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_updated_at_idx\` ON \`payload_jobs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_created_at_idx\` ON \`payload_jobs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`tenants_id\` integer,
  	\`pages_id\` integer,
  	\`industry_categories_id\` integer,
  	\`industries_id\` integer,
  	\`job_titles_id\` integer,
  	\`skills_id\` integer,
  	\`content_variations_id\` integer,
  	\`word_form_sets_id\` integer,
  	\`tmpl_ovrd_id\` integer,
  	\`tenant_page_configs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tenants_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`industry_categories_id\`) REFERENCES \`industry_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`industries_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`job_titles_id\`) REFERENCES \`job_titles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`skills_id\`) REFERENCES \`skills\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`content_variations_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`word_form_sets_id\`) REFERENCES \`word_form_sets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tmpl_ovrd_id\`) REFERENCES \`tmpl_ovrd\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tenant_page_configs_id\`) REFERENCES \`tenant_page_configs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tenants_id_idx\` ON \`payload_locked_documents_rels\` (\`tenants_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_industry_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`industry_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_industries_id_idx\` ON \`payload_locked_documents_rels\` (\`industries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_job_titles_id_idx\` ON \`payload_locked_documents_rels\` (\`job_titles_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_skills_id_idx\` ON \`payload_locked_documents_rels\` (\`skills_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_content_variations_id_idx\` ON \`payload_locked_documents_rels\` (\`content_variations_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_word_form_sets_id_idx\` ON \`payload_locked_documents_rels\` (\`word_form_sets_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tmpl_ovrd_id_idx\` ON \`payload_locked_documents_rels\` (\`tmpl_ovrd_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tenant_page_configs_id_idx\` ON \`payload_locked_documents_rels\` (\`tenant_page_configs_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_hero_split_review_avatars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template_blocks_hero_split\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_hero_split_review_avatars_order_idx\` ON \`industry_template_blocks_hero_split_review_avatars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_hero_split_review_avatars_parent_id_idx\` ON \`industry_template_blocks_hero_split_review_avatars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_hero_split_review_avatars_image_idx\` ON \`industry_template_blocks_hero_split_review_avatars\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_hero_split\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_variation_set_id\` integer,
  	\`image_id\` integer,
  	\`review_rating\` text DEFAULT '5.0',
  	\`block_name\` text,
  	FOREIGN KEY (\`heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_hero_split_order_idx\` ON \`industry_template_blocks_hero_split\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_hero_split_parent_id_idx\` ON \`industry_template_blocks_hero_split\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_hero_split_path_idx\` ON \`industry_template_blocks_hero_split\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_hero_split_heading_heading_vari_idx\` ON \`industry_template_blocks_hero_split\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_hero_split_description_descript_idx\` ON \`industry_template_blocks_hero_split\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_hero_split_image_idx\` ON \`industry_template_blocks_hero_split\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_hero_split_locales\` (
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Get started',
  	\`form_helper_text\` text DEFAULT 'We care about your data in our privacy policy.',
  	\`review_text\` text DEFAULT 'from 200+ reviews',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template_blocks_hero_split\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industry_template_blocks_hero_split_locales_locale_parent_id\` ON \`industry_template_blocks_hero_split_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_blog_articles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`thumbnail_id\` integer,
  	\`published_at\` text,
  	\`author_image_id\` integer,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template_blocks_blog\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_blog_articles_order_idx\` ON \`industry_template_blocks_blog_articles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_blog_articles_parent_id_idx\` ON \`industry_template_blocks_blog_articles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_blog_articles_thumbnail_idx\` ON \`industry_template_blocks_blog_articles\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_blog_articles_author_image_idx\` ON \`industry_template_blocks_blog_articles\` (\`author_image_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_blog_articles_locales\` (
  	\`title\` text,
  	\`summary\` text,
  	\`category_name\` text,
  	\`reading_time\` text,
  	\`author_name\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template_blocks_blog_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industry_template_blocks_blog_articles_locales_locale_parent\` ON \`industry_template_blocks_blog_articles_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_blog\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_variation_set_id\` integer,
  	\`section_id\` text,
  	\`section_group\` text DEFAULT 'test',
  	\`block_name\` text,
  	FOREIGN KEY (\`heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_blog_order_idx\` ON \`industry_template_blocks_blog\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_blog_parent_id_idx\` ON \`industry_template_blocks_blog\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_blog_path_idx\` ON \`industry_template_blocks_blog\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_blog_heading_heading_variation__idx\` ON \`industry_template_blocks_blog\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_blog_description_description_va_idx\` ON \`industry_template_blocks_blog\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_blog_locales\` (
  	\`label\` text DEFAULT 'Blog',
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Subscribe',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template_blocks_blog\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industry_template_blocks_blog_locales_locale_parent_id_uniqu\` ON \`industry_template_blocks_blog_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_testimonials_reviews\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`author_image_id\` integer,
  	\`company_name\` text,
  	\`company_logo_id\` integer,
  	\`company_logo_dark_id\` integer,
  	FOREIGN KEY (\`author_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`company_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`company_logo_dark_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_testimonials_reviews_order_idx\` ON \`industry_template_blocks_testimonials_reviews\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_testimonials_reviews_parent_id_idx\` ON \`industry_template_blocks_testimonials_reviews\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_testimonials_reviews_author_ima_idx\` ON \`industry_template_blocks_testimonials_reviews\` (\`author_image_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_testimonials_reviews_company_lo_idx\` ON \`industry_template_blocks_testimonials_reviews\` (\`company_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_testimonials_reviews_company__1_idx\` ON \`industry_template_blocks_testimonials_reviews\` (\`company_logo_dark_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_testimonials_reviews_locales\` (
  	\`quote\` text,
  	\`author_name\` text,
  	\`author_title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template_blocks_testimonials_reviews\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industry_template_blocks_testimonials_reviews_locales_locale\` ON \`industry_template_blocks_testimonials_reviews_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_variation_set_id\` integer,
  	\`section_id\` text,
  	\`section_group\` text DEFAULT 'test',
  	\`block_name\` text,
  	FOREIGN KEY (\`heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_testimonials_order_idx\` ON \`industry_template_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_testimonials_parent_id_idx\` ON \`industry_template_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_testimonials_path_idx\` ON \`industry_template_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_testimonials_heading_heading_va_idx\` ON \`industry_template_blocks_testimonials\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_testimonials_description_descri_idx\` ON \`industry_template_blocks_testimonials\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_testimonials_locales\` (
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industry_template_blocks_testimonials_locales_locale_parent_\` ON \`industry_template_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_metrics_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`cta_link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template_blocks_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_metrics_metrics_order_idx\` ON \`industry_template_blocks_metrics_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_metrics_metrics_parent_id_idx\` ON \`industry_template_blocks_metrics_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_metrics_metrics_locales\` (
  	\`value\` text,
  	\`label\` text,
  	\`description\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template_blocks_metrics_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industry_template_blocks_metrics_metrics_locales_locale_pare\` ON \`industry_template_blocks_metrics_metrics_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_variation_set_id\` integer,
  	\`section_id\` text,
  	\`section_group\` text DEFAULT 'test',
  	\`block_name\` text,
  	FOREIGN KEY (\`heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_metrics_order_idx\` ON \`industry_template_blocks_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_metrics_parent_id_idx\` ON \`industry_template_blocks_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_metrics_path_idx\` ON \`industry_template_blocks_metrics\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_metrics_heading_heading_variati_idx\` ON \`industry_template_blocks_metrics\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_metrics_description_description_idx\` ON \`industry_template_blocks_metrics\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_metrics_locales\` (
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template_blocks_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industry_template_blocks_metrics_locales_locale_parent_id_un\` ON \`industry_template_blocks_metrics_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_hero_split_review_avatars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template_blocks_hero_split\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_hero_split_review_avatars_order_idx\` ON \`job_title_template_blocks_hero_split_review_avatars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_hero_split_review_avatars_parent_id_idx\` ON \`job_title_template_blocks_hero_split_review_avatars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_hero_split_review_avatars_imag_idx\` ON \`job_title_template_blocks_hero_split_review_avatars\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_hero_split\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_variation_set_id\` integer,
  	\`image_id\` integer,
  	\`review_rating\` text DEFAULT '5.0',
  	\`block_name\` text,
  	FOREIGN KEY (\`heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_hero_split_order_idx\` ON \`job_title_template_blocks_hero_split\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_hero_split_parent_id_idx\` ON \`job_title_template_blocks_hero_split\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_hero_split_path_idx\` ON \`job_title_template_blocks_hero_split\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_hero_split_heading_heading_var_idx\` ON \`job_title_template_blocks_hero_split\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_hero_split_description_descrip_idx\` ON \`job_title_template_blocks_hero_split\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_hero_split_image_idx\` ON \`job_title_template_blocks_hero_split\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_hero_split_locales\` (
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Get started',
  	\`form_helper_text\` text DEFAULT 'We care about your data in our privacy policy.',
  	\`review_text\` text DEFAULT 'from 200+ reviews',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template_blocks_hero_split\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`job_title_template_blocks_hero_split_locales_locale_parent_i\` ON \`job_title_template_blocks_hero_split_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_blog_articles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`thumbnail_id\` integer,
  	\`published_at\` text,
  	\`author_image_id\` integer,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template_blocks_blog\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_blog_articles_order_idx\` ON \`job_title_template_blocks_blog_articles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_blog_articles_parent_id_idx\` ON \`job_title_template_blocks_blog_articles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_blog_articles_thumbnail_idx\` ON \`job_title_template_blocks_blog_articles\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_blog_articles_author_image_idx\` ON \`job_title_template_blocks_blog_articles\` (\`author_image_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_blog_articles_locales\` (
  	\`title\` text,
  	\`summary\` text,
  	\`category_name\` text,
  	\`reading_time\` text,
  	\`author_name\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template_blocks_blog_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`job_title_template_blocks_blog_articles_locales_locale_paren\` ON \`job_title_template_blocks_blog_articles_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_blog\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_variation_set_id\` integer,
  	\`section_id\` text,
  	\`section_group\` text DEFAULT 'test',
  	\`block_name\` text,
  	FOREIGN KEY (\`heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_blog_order_idx\` ON \`job_title_template_blocks_blog\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_blog_parent_id_idx\` ON \`job_title_template_blocks_blog\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_blog_path_idx\` ON \`job_title_template_blocks_blog\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_blog_heading_heading_variation_idx\` ON \`job_title_template_blocks_blog\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_blog_description_description_v_idx\` ON \`job_title_template_blocks_blog\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_blog_locales\` (
  	\`label\` text DEFAULT 'Blog',
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Subscribe',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template_blocks_blog\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`job_title_template_blocks_blog_locales_locale_parent_id_uniq\` ON \`job_title_template_blocks_blog_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_testimonials_reviews\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`author_image_id\` integer,
  	\`company_name\` text,
  	\`company_logo_id\` integer,
  	\`company_logo_dark_id\` integer,
  	FOREIGN KEY (\`author_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`company_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`company_logo_dark_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_testimonials_reviews_order_idx\` ON \`job_title_template_blocks_testimonials_reviews\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_testimonials_reviews_parent_id_idx\` ON \`job_title_template_blocks_testimonials_reviews\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_testimonials_reviews_author_im_idx\` ON \`job_title_template_blocks_testimonials_reviews\` (\`author_image_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_testimonials_reviews_company_l_idx\` ON \`job_title_template_blocks_testimonials_reviews\` (\`company_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_testimonials_reviews_company_1_idx\` ON \`job_title_template_blocks_testimonials_reviews\` (\`company_logo_dark_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_testimonials_reviews_locales\` (
  	\`quote\` text,
  	\`author_name\` text,
  	\`author_title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template_blocks_testimonials_reviews\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`job_title_template_blocks_testimonials_reviews_locales_local\` ON \`job_title_template_blocks_testimonials_reviews_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_variation_set_id\` integer,
  	\`section_id\` text,
  	\`section_group\` text DEFAULT 'test',
  	\`block_name\` text,
  	FOREIGN KEY (\`heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_testimonials_order_idx\` ON \`job_title_template_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_testimonials_parent_id_idx\` ON \`job_title_template_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_testimonials_path_idx\` ON \`job_title_template_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_testimonials_heading_heading_v_idx\` ON \`job_title_template_blocks_testimonials\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_testimonials_description_descr_idx\` ON \`job_title_template_blocks_testimonials\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_testimonials_locales\` (
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`job_title_template_blocks_testimonials_locales_locale_parent\` ON \`job_title_template_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_metrics_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`cta_link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template_blocks_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_metrics_metrics_order_idx\` ON \`job_title_template_blocks_metrics_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_metrics_metrics_parent_id_idx\` ON \`job_title_template_blocks_metrics_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_metrics_metrics_locales\` (
  	\`value\` text,
  	\`label\` text,
  	\`description\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template_blocks_metrics_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`job_title_template_blocks_metrics_metrics_locales_locale_par\` ON \`job_title_template_blocks_metrics_metrics_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_variation_set_id\` integer,
  	\`section_id\` text,
  	\`section_group\` text DEFAULT 'test',
  	\`block_name\` text,
  	FOREIGN KEY (\`heading_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`description_variation_set_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_metrics_order_idx\` ON \`job_title_template_blocks_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_metrics_parent_id_idx\` ON \`job_title_template_blocks_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_metrics_path_idx\` ON \`job_title_template_blocks_metrics\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_metrics_heading_heading_variat_idx\` ON \`job_title_template_blocks_metrics\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_metrics_description_descriptio_idx\` ON \`job_title_template_blocks_metrics\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_metrics_locales\` (
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template_blocks_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`job_title_template_blocks_metrics_locales_locale_parent_id_u\` ON \`job_title_template_blocks_metrics_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`suffix_variations_adjectives\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`word_form_set_id\` integer NOT NULL,
  	\`weight\` numeric DEFAULT 1,
  	FOREIGN KEY (\`word_form_set_id\`) REFERENCES \`word_form_sets\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`suffix_variations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`suffix_variations_adjectives_order_idx\` ON \`suffix_variations_adjectives\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`suffix_variations_adjectives_parent_id_idx\` ON \`suffix_variations_adjectives\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`suffix_variations_adjectives_word_form_set_idx\` ON \`suffix_variations_adjectives\` (\`word_form_set_id\`);`)
  await db.run(sql`CREATE TABLE \`suffix_variations_builders\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`word_form_set_id\` integer NOT NULL,
  	\`weight\` numeric DEFAULT 1,
  	FOREIGN KEY (\`word_form_set_id\`) REFERENCES \`word_form_sets\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`suffix_variations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`suffix_variations_builders_order_idx\` ON \`suffix_variations_builders\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`suffix_variations_builders_parent_id_idx\` ON \`suffix_variations_builders\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`suffix_variations_builders_word_form_set_idx\` ON \`suffix_variations_builders\` (\`word_form_set_id\`);`)
  await db.run(sql`CREATE TABLE \`suffix_variations_content_words\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`word_form_set_id\` integer NOT NULL,
  	\`weight\` numeric DEFAULT 1,
  	FOREIGN KEY (\`word_form_set_id\`) REFERENCES \`word_form_sets\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`suffix_variations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`suffix_variations_content_words_order_idx\` ON \`suffix_variations_content_words\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`suffix_variations_content_words_parent_id_idx\` ON \`suffix_variations_content_words\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`suffix_variations_content_words_word_form_set_idx\` ON \`suffix_variations_content_words\` (\`word_form_set_id\`);`)
  await db.run(sql`CREATE TABLE \`suffix_variations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`default_suffix_count\` numeric DEFAULT 3,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_roles\`;`)
  await db.run(sql`DROP TABLE \`users_tenants_roles\`;`)
  await db.run(sql`DROP TABLE \`users_tenants\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`tenants_supported_locales\`;`)
  await db.run(sql`DROP TABLE \`tenants\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_split_review_avatars\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_split\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_split_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_blog_articles\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_blog_articles_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_blog\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_blog_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials_reviews\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials_reviews_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_metrics_metrics\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_metrics_metrics_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_metrics\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_metrics_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_split_review_avatars\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_split\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_split_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_blog_articles\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_blog_articles_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_blog\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_blog_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials_reviews\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials_reviews_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_metrics_metrics\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_metrics_metrics_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_metrics\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_metrics_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_locales\`;`)
  await db.run(sql`DROP TABLE \`industry_categories\`;`)
  await db.run(sql`DROP TABLE \`industry_categories_locales\`;`)
  await db.run(sql`DROP TABLE \`industries\`;`)
  await db.run(sql`DROP TABLE \`industries_locales\`;`)
  await db.run(sql`DROP TABLE \`job_titles\`;`)
  await db.run(sql`DROP TABLE \`job_titles_locales\`;`)
  await db.run(sql`DROP TABLE \`job_titles_rels\`;`)
  await db.run(sql`DROP TABLE \`skills\`;`)
  await db.run(sql`DROP TABLE \`skills_locales\`;`)
  await db.run(sql`DROP TABLE \`content_variations_options\`;`)
  await db.run(sql`DROP TABLE \`content_variations_options_locales\`;`)
  await db.run(sql`DROP TABLE \`content_variations\`;`)
  await db.run(sql`DROP TABLE \`word_form_sets\`;`)
  await db.run(sql`DROP TABLE \`word_form_sets_locales\`;`)
  await db.run(sql`DROP TABLE \`enum_tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds\`;`)
  await db.run(sql`DROP TABLE \`enum_tmpl_ovrd_sect_ovrd_ovrds_blog_flds\`;`)
  await db.run(sql`DROP TABLE \`enum_tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds\`;`)
  await db.run(sql`DROP TABLE \`enum_tmpl_ovrd_sect_ovrd_ovrds_metrics_flds\`;`)
  await db.run(sql`DROP TABLE \`tmpl_ovrd_sect_ovrd\`;`)
  await db.run(sql`DROP TABLE \`tmpl_ovrd_sect_ovrd_locales\`;`)
  await db.run(sql`DROP TABLE \`tmpl_ovrd\`;`)
  await db.run(sql`DROP TABLE \`tmpl_ovrd_rels\`;`)
  await db.run(sql`DROP TABLE \`tenant_page_configs\`;`)
  await db.run(sql`DROP TABLE \`tenant_page_configs_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_log\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_hero_split_review_avatars\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_hero_split\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_hero_split_locales\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_blog_articles\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_blog_articles_locales\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_blog\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_blog_locales\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_testimonials_reviews\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_testimonials_reviews_locales\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_metrics_metrics\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_metrics_metrics_locales\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_metrics\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_metrics_locales\`;`)
  await db.run(sql`DROP TABLE \`industry_template\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_hero_split_review_avatars\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_hero_split\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_hero_split_locales\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_blog_articles\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_blog_articles_locales\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_blog\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_blog_locales\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_testimonials_reviews\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_testimonials_reviews_locales\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_metrics_metrics\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_metrics_metrics_locales\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_metrics\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_metrics_locales\`;`)
  await db.run(sql`DROP TABLE \`job_title_template\`;`)
  await db.run(sql`DROP TABLE \`suffix_variations_adjectives\`;`)
  await db.run(sql`DROP TABLE \`suffix_variations_builders\`;`)
  await db.run(sql`DROP TABLE \`suffix_variations_content_words\`;`)
  await db.run(sql`DROP TABLE \`suffix_variations\`;`)
}
