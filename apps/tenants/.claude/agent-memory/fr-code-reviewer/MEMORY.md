# Agent Memory - Code Reviewer

## Project Architecture

- Payload CMS 3.77.0 + Next.js 15.4 on Cloudflare Workers (D1 SQLite, R2 storage)
- Multi-tenant architecture using `@payloadcms/plugin-multi-tenant`
- Nested docs via `@payloadcms/plugin-nested-docs`
- Collections: Users, Media, Tenants, Pages
- Path alias: `@/*` maps to `./src/*` (tsconfig.json)
- `strictNullChecks: false` in tsconfig

## Key File Locations

- Config: `src/payload.config.ts`
- Access control helpers: `src/access/`
- Utilities: `src/utils/` (NOTE: some files import `@/utilities/` which does NOT exist - broken imports)
- Plugins: `src/plugins/multiTenant.ts`, `src/plugins/nestedDocs.ts`
- Page queries: `src/collections/Pages/queries/`
- Blocks: `src/blocks/`

## Patterns

- Access control uses `isSuperAdmin()` helper consistently
- `getUserTenantIDs()` with optional role filter for tenant-scoped access
- Revalidation hook pattern with `context.disableRevalidate` guard
- Pages use breadcrumbs-based URL resolution from nested-docs plugin
