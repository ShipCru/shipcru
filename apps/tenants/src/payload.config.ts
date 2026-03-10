import type { User } from './payload-types'

import fs from 'fs'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { GetPlatformProxyOptions } from 'wrangler'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { r2Storage } from '@payloadcms/storage-r2'

import { isSuperAdmin } from './access/isSuperAdmin'
import { ContentVariations } from './collections/ContentVariations'
import { Industries } from './collections/Industries'
import { IndustryCategories } from './collections/IndustryCategories'
import { JobTitles } from './collections/JobTitles'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Skills } from './collections/Skills'
import { TemplateOverrides } from './collections/TemplateOverrides'
import { TenantPageConfigs } from './collections/TenantPageConfigs'
import { Tenants } from './collections/Tenants'
import { Users } from './collections/Users'
import { WordFormSets } from './collections/WordFormSets'
import { DefaultIndustryTemplate } from './globals/DefaultIndustryTemplate'
import { DefaultJobTitleTemplate } from './globals/DefaultJobTitleTemplate'
import { SuffixVariations } from './globals/SuffixVariations'
import { SUPPORTED_LOCALES } from './locales'
import { pluginMultiTenant } from './plugins/multiTenant'
import { pluginNestedDocs } from './plugins/nestedDocs'
import { getUserTenantIDs } from './utils/getUserTenantIDs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : undefined)

const isCLI = process.argv.some((value) =>
  realpath(value)?.endsWith(path.join('payload', 'bin.js')),
)
const isProduction = process.env.NODE_ENV === 'production'

const createLog =
  (level: string, fn: typeof console.log) => (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === 'string') {
      fn(JSON.stringify({ level, msg: objOrMsg }))
    } else {
      fn(JSON.stringify({ level, ...objOrMsg, msg: msg ?? (objOrMsg as { msg?: string }).msg }))
    }
  }

const cloudflareLogger = {
  level: process.env.PAYLOAD_LOG_LEVEL || 'info',
  trace: createLog('trace', console.debug),
  debug: createLog('debug', console.debug),
  info: createLog('info', console.log),
  warn: createLog('warn', console.warn),
  error: createLog('error', console.error),
  fatal: createLog('fatal', console.error),
  silent: () => {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any // Use PayloadLogger type when it's exported

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Tenants,
    Pages,
    // Global reference data (not tenant-scoped):
    IndustryCategories,
    Industries,
    JobTitles,
    Skills,
    // Template system:
    ContentVariations,
    WordFormSets,
    // Group C: Template overrides & tenant page configs:
    TemplateOverrides,
    TenantPageConfigs,
  ],
  globals: [DefaultIndustryTemplate, DefaultJobTitleTemplate, SuffixVariations],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({ binding: cloudflare.env.D1 }),
  logger: isProduction ? cloudflareLogger : undefined,
  localization: {
    locales: SUPPORTED_LOCALES.map((l) => ({ code: l.value, label: l.label })),
    defaultLocale: 'en',
    filterAvailableLocales: async ({ req, locales }) => {
      if (isSuperAdmin(req.user as User | null)) {
        return locales
      }

      const tenantIds = getUserTenantIDs(req.user as User | null)
      if (!tenantIds.length) {
        return locales
      }

      const tenants = await req.payload.find({
        collection: 'tenants',
        where: { id: { in: tenantIds } },
        select: { supportedLocales: true },
        req,
      })

      const availableLocales = new Set<string>(
        tenants.docs.flatMap((doc) => doc.supportedLocales ?? []).filter(Boolean),
      )
      return availableLocales.size > 0
        ? locales.filter((l) => availableLocales.has(l.code as string))
        : locales
    },
  },
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
    pluginMultiTenant,
    pluginNestedDocs,
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  )
}
