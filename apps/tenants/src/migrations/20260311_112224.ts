import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`variant\` text DEFAULT 'primary',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_links_order_idx\` ON \`pages_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_links_parent_id_idx\` ON \`pages_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_cta_links_locales_locale_parent_id_unique\` ON \`pages_blocks_cta_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_order_idx\` ON \`pages_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_parent_id_idx\` ON \`pages_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_path_idx\` ON \`pages_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_heading_heading_variation_set_idx\` ON \`pages_blocks_cta\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_description_description_variation_set_idx\` ON \`pages_blocks_cta\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_locales\` (
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_cta_locales_locale_parent_id_unique\` ON \`pages_blocks_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`variant\` text DEFAULT 'primary',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_links_order_idx\` ON \`_pages_v_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_links_parent_id_idx\` ON \`_pages_v_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cta_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_cta_links_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_cta_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_order_idx\` ON \`_pages_v_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_parent_id_idx\` ON \`_pages_v_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_path_idx\` ON \`_pages_v_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_heading_heading_variation_set_idx\` ON \`_pages_v_blocks_cta\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_description_description_variation_se_idx\` ON \`_pages_v_blocks_cta\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_locales\` (
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_cta_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_pages_id_idx\` ON \`_pages_v_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE TABLE \`enum_tmpl_ovrd_sect_ovrd_ovrds_cta_flds\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tmpl_ovrd_sect_ovrd\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`enum_tmpl_ovrd_sect_ovrd_ovrds_cta_flds_order_idx\` ON \`enum_tmpl_ovrd_sect_ovrd_ovrds_cta_flds\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`enum_tmpl_ovrd_sect_ovrd_ovrds_cta_flds_parent_idx\` ON \`enum_tmpl_ovrd_sect_ovrd_ovrds_cta_flds\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`variant\` text DEFAULT 'primary',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_cta_links_order_idx\` ON \`industry_template_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_cta_links_parent_id_idx\` ON \`industry_template_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_cta_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template_blocks_cta_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industry_template_blocks_cta_links_locales_locale_parent_id_\` ON \`industry_template_blocks_cta_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_cta\` (
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
  await db.run(sql`CREATE INDEX \`industry_template_blocks_cta_order_idx\` ON \`industry_template_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_cta_parent_id_idx\` ON \`industry_template_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_cta_path_idx\` ON \`industry_template_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_cta_heading_heading_variation_s_idx\` ON \`industry_template_blocks_cta\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_cta_description_description_var_idx\` ON \`industry_template_blocks_cta\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_cta_locales\` (
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industry_template_blocks_cta_locales_locale_parent_id_unique\` ON \`industry_template_blocks_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`industry_template\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industry_template_rels_order_idx\` ON \`industry_template_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_rels_parent_idx\` ON \`industry_template_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_rels_path_idx\` ON \`industry_template_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_rels_pages_id_idx\` ON \`industry_template_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`variant\` text DEFAULT 'primary',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_cta_links_order_idx\` ON \`job_title_template_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_cta_links_parent_id_idx\` ON \`job_title_template_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_cta_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template_blocks_cta_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`job_title_template_blocks_cta_links_locales_locale_parent_id\` ON \`job_title_template_blocks_cta_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_cta\` (
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
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_cta_order_idx\` ON \`job_title_template_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_cta_parent_id_idx\` ON \`job_title_template_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_cta_path_idx\` ON \`job_title_template_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_cta_heading_heading_variation__idx\` ON \`job_title_template_blocks_cta\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_cta_description_description_va_idx\` ON \`job_title_template_blocks_cta\` (\`description_variation_set_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_cta_locales\` (
  	\`heading_fixed_text\` text,
  	\`description_fixed_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`job_title_template_blocks_cta_locales_locale_parent_id_uniqu\` ON \`job_title_template_blocks_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`job_title_template\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`job_title_template_rels_order_idx\` ON \`job_title_template_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_rels_parent_idx\` ON \`job_title_template_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_rels_path_idx\` ON \`job_title_template_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_rels_pages_id_idx\` ON \`job_title_template_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items_dropdown_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_nav_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_nav_items_dropdown_items_order_idx\` ON \`header_nav_items_dropdown_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_dropdown_items_parent_id_idx\` ON \`header_nav_items_dropdown_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items_dropdown_items_locales\` (
  	\`link_label\` text,
  	\`subtitle\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_nav_items_dropdown_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`header_nav_items_dropdown_items_locales_locale_parent_id_uni\` ON \`header_nav_items_dropdown_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'link',
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items_locales\` (
  	\`link_label\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_nav_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`header_nav_items_locales_locale_parent_id_unique\` ON \`header_nav_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`header_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_rels_order_idx\` ON \`header_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_parent_idx\` ON \`header_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_path_idx\` ON \`header_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_pages_id_idx\` ON \`header_rels\` (\`pages_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_metrics_metrics\` ADD \`icon\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_metrics_metrics\` ADD \`icon\` text;`)
  await db.run(sql`ALTER TABLE \`tmpl_ovrd_sect_ovrd\` ADD \`ovrds_cta_heading_mode\` text DEFAULT 'fixed';`)
  await db.run(sql`ALTER TABLE \`tmpl_ovrd_sect_ovrd\` ADD \`ovrds_cta_heading_variation_set_id\` integer REFERENCES content_variations(id);`)
  await db.run(sql`ALTER TABLE \`tmpl_ovrd_sect_ovrd\` ADD \`ovrds_cta_description_mode\` text DEFAULT 'fixed';`)
  await db.run(sql`ALTER TABLE \`tmpl_ovrd_sect_ovrd\` ADD \`ovrds_cta_description_variation_set_id\` integer REFERENCES content_variations(id);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_sect_ovrd_ovrds_cta_heading_ovrds_cta_heading__idx\` ON \`tmpl_ovrd_sect_ovrd\` (\`ovrds_cta_heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`tmpl_ovrd_sect_ovrd_ovrds_cta_description_ovrds_cta_desc_idx\` ON \`tmpl_ovrd_sect_ovrd\` (\`ovrds_cta_description_variation_set_id\`);`)
  await db.run(sql`ALTER TABLE \`tmpl_ovrd_sect_ovrd_locales\` ADD \`ovrds_cta_heading_fixed_text\` text;`)
  await db.run(sql`ALTER TABLE \`tmpl_ovrd_sect_ovrd_locales\` ADD \`ovrds_cta_description_fixed_text\` text;`)
  await db.run(sql`ALTER TABLE \`industry_template_blocks_metrics_metrics\` ADD \`icon\` text;`)
  await db.run(sql`ALTER TABLE \`job_title_template_blocks_metrics_metrics\` ADD \`icon\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_metrics_metrics_locales\` DROP COLUMN \`value\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_metrics_metrics_locales\` DROP COLUMN \`value\`;`)
  await db.run(sql`ALTER TABLE \`industry_template_blocks_metrics_metrics_locales\` DROP COLUMN \`value\`;`)
  await db.run(sql`ALTER TABLE \`job_title_template_blocks_metrics_metrics_locales\` DROP COLUMN \`value\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_links_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_links_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`enum_tmpl_ovrd_sect_ovrd_ovrds_cta_flds\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_cta_links_locales\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`industry_template_rels\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_cta_links_locales\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_rels\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items_dropdown_items\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items_dropdown_items_locales\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items_locales\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`header_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_tmpl_ovrd_sect_ovrd\` (
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
  await db.run(sql`INSERT INTO \`__new_tmpl_ovrd_sect_ovrd\`("_order", "_parent_id", "id", "section_block_type", "action", "locked", "section_group", "ovrds_herosplit_heading_mode", "ovrds_herosplit_heading_variation_set_id", "ovrds_herosplit_description_mode", "ovrds_herosplit_description_variation_set_id", "ovrds_blog_heading_mode", "ovrds_blog_heading_variation_set_id", "ovrds_blog_description_mode", "ovrds_blog_description_variation_set_id", "ovrds_testimonials_heading_mode", "ovrds_testimonials_heading_variation_set_id", "ovrds_testimonials_description_mode", "ovrds_testimonials_description_variation_set_id", "ovrds_metrics_heading_mode", "ovrds_metrics_heading_variation_set_id", "ovrds_metrics_description_mode", "ovrds_metrics_description_variation_set_id", "advanced_overrides") SELECT "_order", "_parent_id", "id", "section_block_type", "action", "locked", "section_group", "ovrds_herosplit_heading_mode", "ovrds_herosplit_heading_variation_set_id", "ovrds_herosplit_description_mode", "ovrds_herosplit_description_variation_set_id", "ovrds_blog_heading_mode", "ovrds_blog_heading_variation_set_id", "ovrds_blog_description_mode", "ovrds_blog_description_variation_set_id", "ovrds_testimonials_heading_mode", "ovrds_testimonials_heading_variation_set_id", "ovrds_testimonials_description_mode", "ovrds_testimonials_description_variation_set_id", "ovrds_metrics_heading_mode", "ovrds_metrics_heading_variation_set_id", "ovrds_metrics_description_mode", "ovrds_metrics_description_variation_set_id", "advanced_overrides" FROM \`tmpl_ovrd_sect_ovrd\`;`)
  await db.run(sql`DROP TABLE \`tmpl_ovrd_sect_ovrd\`;`)
  await db.run(sql`ALTER TABLE \`__new_tmpl_ovrd_sect_ovrd\` RENAME TO \`tmpl_ovrd_sect_ovrd\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
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
  await db.run(sql`ALTER TABLE \`pages_blocks_metrics_metrics_locales\` ADD \`value\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_metrics_metrics_locales\` ADD \`value\` text;`)
  await db.run(sql`ALTER TABLE \`industry_template_blocks_metrics_metrics_locales\` ADD \`value\` text;`)
  await db.run(sql`ALTER TABLE \`job_title_template_blocks_metrics_metrics_locales\` ADD \`value\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_metrics_metrics\` DROP COLUMN \`icon\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_metrics_metrics\` DROP COLUMN \`icon\`;`)
  await db.run(sql`ALTER TABLE \`tmpl_ovrd_sect_ovrd_locales\` DROP COLUMN \`ovrds_cta_heading_fixed_text\`;`)
  await db.run(sql`ALTER TABLE \`tmpl_ovrd_sect_ovrd_locales\` DROP COLUMN \`ovrds_cta_description_fixed_text\`;`)
  await db.run(sql`ALTER TABLE \`industry_template_blocks_metrics_metrics\` DROP COLUMN \`icon\`;`)
  await db.run(sql`ALTER TABLE \`job_title_template_blocks_metrics_metrics\` DROP COLUMN \`icon\`;`)
}
