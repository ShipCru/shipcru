import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_split_avatars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero_split\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_avatars_order_idx\` ON \`pages_blocks_hero_split_avatars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_avatars_parent_id_idx\` ON \`pages_blocks_hero_split_avatars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_avatars_image_idx\` ON \`pages_blocks_hero_split_avatars\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_split\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_fixed_text\` text,
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_fixed_text\` text,
  	\`description_variation_set_id\` integer,
  	\`image_id\` integer,
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Get started',
  	\`form_helper_text\` text DEFAULT 'We care about your data in our privacy policy.',
  	\`review_text\` text DEFAULT 'from 200+ reviews',
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
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_split_avatars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero_split\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_avatars_order_idx\` ON \`_pages_v_blocks_hero_split_avatars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_avatars_parent_id_idx\` ON \`_pages_v_blocks_hero_split_avatars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_avatars_image_idx\` ON \`_pages_v_blocks_hero_split_avatars\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_split\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_fixed_text\` text,
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_fixed_text\` text,
  	\`description_variation_set_id\` integer,
  	\`image_id\` integer,
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Get started',
  	\`form_helper_text\` text DEFAULT 'We care about your data in our privacy policy.',
  	\`review_text\` text DEFAULT 'from 200+ reviews',
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
  await db.run(sql`CREATE TABLE \`word_form_sets\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`type\` text NOT NULL,
  	\`tenant_id\` integer,
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
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`word_form_sets_tenant_idx\` ON \`word_form_sets\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`word_form_sets_updated_at_idx\` ON \`word_form_sets\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`word_form_sets_created_at_idx\` ON \`word_form_sets\` (\`created_at\`);`)
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
  	\`ovrds_herosplit_heading_fixed_text\` text,
  	\`ovrds_herosplit_heading_variation_set_id\` integer,
  	\`ovrds_herosplit_description_mode\` text DEFAULT 'fixed',
  	\`ovrds_herosplit_description_fixed_text\` text,
  	\`ovrds_herosplit_description_variation_set_id\` integer,
  	\`ovrds_herosplit_form_button_label\` text DEFAULT 'Get started',
  	\`ovrds_blog_heading_mode\` text DEFAULT 'fixed',
  	\`ovrds_blog_heading_fixed_text\` text,
  	\`ovrds_blog_heading_variation_set_id\` integer,
  	\`ovrds_blog_description_mode\` text DEFAULT 'fixed',
  	\`ovrds_blog_description_fixed_text\` text,
  	\`ovrds_blog_description_variation_set_id\` integer,
  	\`ovrds_testimonials_heading_mode\` text DEFAULT 'fixed',
  	\`ovrds_testimonials_heading_fixed_text\` text,
  	\`ovrds_testimonials_heading_variation_set_id\` integer,
  	\`ovrds_testimonials_description_mode\` text DEFAULT 'fixed',
  	\`ovrds_testimonials_description_fixed_text\` text,
  	\`ovrds_testimonials_description_variation_set_id\` integer,
  	\`ovrds_metrics_heading_mode\` text DEFAULT 'fixed',
  	\`ovrds_metrics_heading_fixed_text\` text,
  	\`ovrds_metrics_heading_variation_set_id\` integer,
  	\`ovrds_metrics_description_mode\` text DEFAULT 'fixed',
  	\`ovrds_metrics_description_fixed_text\` text,
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
  await db.run(sql`CREATE TABLE \`industry_template_blocks_hero_split_avatars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template_blocks_hero_split\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_hero_split_avatars_order_idx\` ON \`industry_template_blocks_hero_split_avatars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_hero_split_avatars_parent_id_idx\` ON \`industry_template_blocks_hero_split_avatars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_hero_split_avatars_image_idx\` ON \`industry_template_blocks_hero_split_avatars\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_hero_split\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_fixed_text\` text,
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_fixed_text\` text,
  	\`description_variation_set_id\` integer,
  	\`image_id\` integer,
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Get started',
  	\`form_helper_text\` text DEFAULT 'We care about your data in our privacy policy.',
  	\`review_text\` text DEFAULT 'from 200+ reviews',
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
  await db.run(sql`CREATE TABLE \`industry_template_blocks_blog_articles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`summary\` text,
  	\`href\` text,
  	\`category_name\` text,
  	\`thumbnail_id\` integer,
  	\`published_at\` text,
  	\`reading_time\` text,
  	\`author_name\` text,
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
  await db.run(sql`CREATE TABLE \`industry_template_blocks_blog\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text DEFAULT 'Blog',
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_fixed_text\` text,
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_fixed_text\` text,
  	\`description_variation_set_id\` integer,
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Subscribe',
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
  await db.run(sql`CREATE TABLE \`industry_template_blocks_testimonials_reviews\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`author_name\` text,
  	\`author_title\` text,
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
  await db.run(sql`CREATE TABLE \`industry_template_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_fixed_text\` text,
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_fixed_text\` text,
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
  await db.run(sql`CREATE TABLE \`industry_template_blocks_metrics_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`description\` text,
  	\`cta_label\` text,
  	\`cta_link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industry_template_blocks_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_metrics_metrics_order_idx\` ON \`industry_template_blocks_metrics_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industry_template_blocks_metrics_metrics_parent_id_idx\` ON \`industry_template_blocks_metrics_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industry_template_blocks_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_fixed_text\` text,
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_fixed_text\` text,
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
  await db.run(sql`CREATE TABLE \`industry_template\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_hero_split_avatars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template_blocks_hero_split\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_hero_split_avatars_order_idx\` ON \`job_title_template_blocks_hero_split_avatars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_hero_split_avatars_parent_id_idx\` ON \`job_title_template_blocks_hero_split_avatars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_hero_split_avatars_image_idx\` ON \`job_title_template_blocks_hero_split_avatars\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_hero_split\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_fixed_text\` text,
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_fixed_text\` text,
  	\`description_variation_set_id\` integer,
  	\`image_id\` integer,
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Get started',
  	\`form_helper_text\` text DEFAULT 'We care about your data in our privacy policy.',
  	\`review_text\` text DEFAULT 'from 200+ reviews',
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
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_blog_articles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`summary\` text,
  	\`href\` text,
  	\`category_name\` text,
  	\`thumbnail_id\` integer,
  	\`published_at\` text,
  	\`reading_time\` text,
  	\`author_name\` text,
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
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_blog\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text DEFAULT 'Blog',
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_fixed_text\` text,
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_fixed_text\` text,
  	\`description_variation_set_id\` integer,
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Subscribe',
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
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_testimonials_reviews\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`author_name\` text,
  	\`author_title\` text,
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
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_fixed_text\` text,
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_fixed_text\` text,
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
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_metrics_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`description\` text,
  	\`cta_label\` text,
  	\`cta_link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_title_template_blocks_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_metrics_metrics_order_idx\` ON \`job_title_template_blocks_metrics_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`job_title_template_blocks_metrics_metrics_parent_id_idx\` ON \`job_title_template_blocks_metrics_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`job_title_template_blocks_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_mode\` text DEFAULT 'fixed',
  	\`heading_fixed_text\` text,
  	\`heading_variation_set_id\` integer,
  	\`description_mode\` text DEFAULT 'fixed',
  	\`description_fixed_text\` text,
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
  	\`word\` text,
  	\`weight\` numeric DEFAULT 1,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`suffix_variations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`suffix_variations_adjectives_order_idx\` ON \`suffix_variations_adjectives\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`suffix_variations_adjectives_parent_id_idx\` ON \`suffix_variations_adjectives\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`suffix_variations_builders\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`word\` text,
  	\`weight\` numeric DEFAULT 1,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`suffix_variations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`suffix_variations_builders_order_idx\` ON \`suffix_variations_builders\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`suffix_variations_builders_parent_id_idx\` ON \`suffix_variations_builders\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`suffix_variations_content_words\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`word\` text,
  	\`weight\` numeric DEFAULT 1,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`suffix_variations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`suffix_variations_content_words_order_idx\` ON \`suffix_variations_content_words\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`suffix_variations_content_words_parent_id_idx\` ON \`suffix_variations_content_words\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`suffix_variations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`default_suffix_count\` numeric DEFAULT 3,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_split_image_avatars\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_split_image\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_split_image_avatars\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_split_image\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_blog\` ADD \`heading_mode\` text DEFAULT 'fixed';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_blog\` ADD \`heading_fixed_text\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_blog\` ADD \`heading_variation_set_id\` integer REFERENCES content_variations(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_blog\` ADD \`description_mode\` text DEFAULT 'fixed';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_blog\` ADD \`description_fixed_text\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_blog\` ADD \`description_variation_set_id\` integer REFERENCES content_variations(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_blog\` ADD \`section_id\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_blog\` ADD \`section_group\` text DEFAULT 'test';`)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_heading_heading_variation_set_idx\` ON \`pages_blocks_blog\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_description_description_variation_set_idx\` ON \`pages_blocks_blog\` (\`description_variation_set_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_blog\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_blog\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`heading_mode\` text DEFAULT 'fixed';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`heading_fixed_text\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`heading_variation_set_id\` integer REFERENCES content_variations(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`description_mode\` text DEFAULT 'fixed';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`description_fixed_text\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`description_variation_set_id\` integer REFERENCES content_variations(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`section_id\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`section_group\` text DEFAULT 'test';`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_heading_heading_variation_set_idx\` ON \`pages_blocks_testimonials\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_description_description_variat_idx\` ON \`pages_blocks_testimonials\` (\`description_variation_set_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_metrics\` ADD \`heading_mode\` text DEFAULT 'fixed';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_metrics\` ADD \`heading_fixed_text\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_metrics\` ADD \`heading_variation_set_id\` integer REFERENCES content_variations(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_metrics\` ADD \`description_mode\` text DEFAULT 'fixed';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_metrics\` ADD \`description_fixed_text\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_metrics\` ADD \`description_variation_set_id\` integer REFERENCES content_variations(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_metrics\` ADD \`section_id\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_metrics\` ADD \`section_group\` text DEFAULT 'test';`)
  await db.run(sql`CREATE INDEX \`pages_blocks_metrics_heading_heading_variation_set_idx\` ON \`pages_blocks_metrics\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_metrics_description_description_variation_s_idx\` ON \`pages_blocks_metrics\` (\`description_variation_set_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_metrics\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_metrics\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_blog\` ADD \`heading_mode\` text DEFAULT 'fixed';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_blog\` ADD \`heading_fixed_text\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_blog\` ADD \`heading_variation_set_id\` integer REFERENCES content_variations(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_blog\` ADD \`description_mode\` text DEFAULT 'fixed';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_blog\` ADD \`description_fixed_text\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_blog\` ADD \`description_variation_set_id\` integer REFERENCES content_variations(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_blog\` ADD \`section_id\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_blog\` ADD \`section_group\` text DEFAULT 'test';`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_blog_heading_heading_variation_set_idx\` ON \`_pages_v_blocks_blog\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_blog_description_description_variation_s_idx\` ON \`_pages_v_blocks_blog\` (\`description_variation_set_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_blog\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_blog\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`heading_mode\` text DEFAULT 'fixed';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`heading_fixed_text\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`heading_variation_set_id\` integer REFERENCES content_variations(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`description_mode\` text DEFAULT 'fixed';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`description_fixed_text\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`description_variation_set_id\` integer REFERENCES content_variations(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`section_id\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`section_group\` text DEFAULT 'test';`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_heading_heading_variation_s_idx\` ON \`_pages_v_blocks_testimonials\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_description_description_var_idx\` ON \`_pages_v_blocks_testimonials\` (\`description_variation_set_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_metrics\` ADD \`heading_mode\` text DEFAULT 'fixed';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_metrics\` ADD \`heading_fixed_text\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_metrics\` ADD \`heading_variation_set_id\` integer REFERENCES content_variations(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_metrics\` ADD \`description_mode\` text DEFAULT 'fixed';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_metrics\` ADD \`description_fixed_text\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_metrics\` ADD \`description_variation_set_id\` integer REFERENCES content_variations(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_metrics\` ADD \`section_id\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_metrics\` ADD \`section_group\` text DEFAULT 'test';`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_metrics_heading_heading_variation_set_idx\` ON \`_pages_v_blocks_metrics\` (\`heading_variation_set_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_metrics_description_description_variatio_idx\` ON \`_pages_v_blocks_metrics\` (\`description_variation_set_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_metrics\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_metrics\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`word_form_sets_id\` integer REFERENCES word_form_sets(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`tmpl_ovrd_id\` integer REFERENCES tmpl_ovrd(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`tenant_page_configs_id\` integer REFERENCES tenant_page_configs(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_word_form_sets_id_idx\` ON \`payload_locked_documents_rels\` (\`word_form_sets_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tmpl_ovrd_id_idx\` ON \`payload_locked_documents_rels\` (\`tmpl_ovrd_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tenant_page_configs_id_idx\` ON \`payload_locked_documents_rels\` (\`tenant_page_configs_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_split_image_avatars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero_split_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_image_avatars_order_idx\` ON \`pages_blocks_hero_split_image_avatars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_image_avatars_parent_id_idx\` ON \`pages_blocks_hero_split_image_avatars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_image_avatars_image_idx\` ON \`pages_blocks_hero_split_image_avatars\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_split_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'People who care about your growth',
  	\`description\` text DEFAULT 'Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.',
  	\`image_id\` integer,
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Get started',
  	\`form_helper_text\` text DEFAULT 'We care about your data in our privacy policy.',
  	\`review_text\` text DEFAULT 'from 200+ reviews',
  	\`review_rating\` text DEFAULT '5.0',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_image_order_idx\` ON \`pages_blocks_hero_split_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_image_parent_id_idx\` ON \`pages_blocks_hero_split_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_image_path_idx\` ON \`pages_blocks_hero_split_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_image_image_idx\` ON \`pages_blocks_hero_split_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_split_image_avatars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero_split_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_image_avatars_order_idx\` ON \`_pages_v_blocks_hero_split_image_avatars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_image_avatars_parent_id_idx\` ON \`_pages_v_blocks_hero_split_image_avatars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_image_avatars_image_idx\` ON \`_pages_v_blocks_hero_split_image_avatars\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_split_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'People who care about your growth',
  	\`description\` text DEFAULT 'Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.',
  	\`image_id\` integer,
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Get started',
  	\`form_helper_text\` text DEFAULT 'We care about your data in our privacy policy.',
  	\`review_text\` text DEFAULT 'from 200+ reviews',
  	\`review_rating\` text DEFAULT '5.0',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_image_order_idx\` ON \`_pages_v_blocks_hero_split_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_image_parent_id_idx\` ON \`_pages_v_blocks_hero_split_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_image_path_idx\` ON \`_pages_v_blocks_hero_split_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_split_image_image_idx\` ON \`_pages_v_blocks_hero_split_image\` (\`image_id\`);`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_split_avatars\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_split\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_split_avatars\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_split\`;`)
  await db.run(sql`DROP TABLE \`word_form_sets\`;`)
  await db.run(sql`DROP TABLE \`enum_tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds\`;`)
  await db.run(sql`DROP TABLE \`enum_tmpl_ovrd_sect_ovrd_ovrds_blog_flds\`;`)
  await db.run(sql`DROP TABLE \`enum_tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds\`;`)
  await db.run(sql`DROP TABLE \`enum_tmpl_ovrd_sect_ovrd_ovrds_metrics_flds\`;`)
  await db.run(sql`DROP TABLE \`tmpl_ovrd_sect_ovrd\`;`)
  await db.run(sql`DROP TABLE \`tmpl_ovrd\`;`)
  await db.run(sql`DROP TABLE \`tmpl_ovrd_rels\`;`)
  await db.run(sql`DROP TABLE \`tenant_page_configs\`;`)
  await db.run(sql`DROP TABLE \`tenant_page_configs_rels\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_hero_split_avatars\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_hero_split\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_blog_articles\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_blog\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_testimonials_reviews\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_metrics_metrics\`;`)
  await db.run(sql`DROP TABLE \`industry_template_blocks_metrics\`;`)
  await db.run(sql`DROP TABLE \`industry_template\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_hero_split_avatars\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_hero_split\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_blog_articles\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_blog\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_testimonials_reviews\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_metrics_metrics\`;`)
  await db.run(sql`DROP TABLE \`job_title_template_blocks_metrics\`;`)
  await db.run(sql`DROP TABLE \`job_title_template\`;`)
  await db.run(sql`DROP TABLE \`suffix_variations_adjectives\`;`)
  await db.run(sql`DROP TABLE \`suffix_variations_builders\`;`)
  await db.run(sql`DROP TABLE \`suffix_variations_content_words\`;`)
  await db.run(sql`DROP TABLE \`suffix_variations\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_blog\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text DEFAULT 'Blog',
  	\`heading\` text DEFAULT 'Resource library',
  	\`description\` text DEFAULT 'Subscribe to learn about new product features, the latest in technology, solutions, and updates.',
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Subscribe',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_blog\`("_order", "_parent_id", "_path", "id", "label", "heading", "description", "form_placeholder", "form_button_label", "block_name") SELECT "_order", "_parent_id", "_path", "id", "label", "heading", "description", "form_placeholder", "form_button_label", "block_name" FROM \`pages_blocks_blog\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_blog\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_blog\` RENAME TO \`pages_blocks_blog\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_order_idx\` ON \`pages_blocks_blog\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_parent_id_idx\` ON \`pages_blocks_blog\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_path_idx\` ON \`pages_blocks_blog\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Our reviews',
  	\`description\` text DEFAULT 'Hear first-hand from our incredible community of customers.',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_testimonials\`("_order", "_parent_id", "_path", "id", "heading", "description", "block_name") SELECT "_order", "_parent_id", "_path", "id", "heading", "description", "block_name" FROM \`pages_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_testimonials\` RENAME TO \`pages_blocks_testimonials\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_order_idx\` ON \`pages_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_parent_id_idx\` ON \`pages_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_path_idx\` ON \`pages_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Build something great',
  	\`description\` text DEFAULT 'Everything you need to build modern UI and great products.',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_metrics\`("_order", "_parent_id", "_path", "id", "heading", "description", "block_name") SELECT "_order", "_parent_id", "_path", "id", "heading", "description", "block_name" FROM \`pages_blocks_metrics\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_metrics\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_metrics\` RENAME TO \`pages_blocks_metrics\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_metrics_order_idx\` ON \`pages_blocks_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_metrics_parent_id_idx\` ON \`pages_blocks_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_metrics_path_idx\` ON \`pages_blocks_metrics\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_blog\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text DEFAULT 'Blog',
  	\`heading\` text DEFAULT 'Resource library',
  	\`description\` text DEFAULT 'Subscribe to learn about new product features, the latest in technology, solutions, and updates.',
  	\`form_placeholder\` text DEFAULT 'Enter your email',
  	\`form_button_label\` text DEFAULT 'Subscribe',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_blog\`("_order", "_parent_id", "_path", "id", "label", "heading", "description", "form_placeholder", "form_button_label", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "label", "heading", "description", "form_placeholder", "form_button_label", "_uuid", "block_name" FROM \`_pages_v_blocks_blog\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_blog\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_blog\` RENAME TO \`_pages_v_blocks_blog\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_blog_order_idx\` ON \`_pages_v_blocks_blog\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_blog_parent_id_idx\` ON \`_pages_v_blocks_blog\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_blog_path_idx\` ON \`_pages_v_blocks_blog\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Our reviews',
  	\`description\` text DEFAULT 'Hear first-hand from our incredible community of customers.',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_testimonials\`("_order", "_parent_id", "_path", "id", "heading", "description", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "heading", "description", "_uuid", "block_name" FROM \`_pages_v_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_testimonials\` RENAME TO \`_pages_v_blocks_testimonials\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_order_idx\` ON \`_pages_v_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_parent_id_idx\` ON \`_pages_v_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_path_idx\` ON \`_pages_v_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Build something great',
  	\`description\` text DEFAULT 'Everything you need to build modern UI and great products.',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_metrics\`("_order", "_parent_id", "_path", "id", "heading", "description", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "heading", "description", "_uuid", "block_name" FROM \`_pages_v_blocks_metrics\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_metrics\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_metrics\` RENAME TO \`_pages_v_blocks_metrics\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_metrics_order_idx\` ON \`_pages_v_blocks_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_metrics_parent_id_idx\` ON \`_pages_v_blocks_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_metrics_path_idx\` ON \`_pages_v_blocks_metrics\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
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
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tenants_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`industry_categories_id\`) REFERENCES \`industry_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`industries_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`job_titles_id\`) REFERENCES \`job_titles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`skills_id\`) REFERENCES \`skills\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`content_variations_id\`) REFERENCES \`content_variations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "tenants_id", "pages_id", "industry_categories_id", "industries_id", "job_titles_id", "skills_id", "content_variations_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "tenants_id", "pages_id", "industry_categories_id", "industries_id", "job_titles_id", "skills_id", "content_variations_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
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
}
