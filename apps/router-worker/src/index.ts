import { getRoutingConfig, matchRoute, getMigratedPaths } from './config'
import { proxyToVercel } from './vercel-proxy'
import { fetchFromNewOrigin } from './new-origin'
import { handleStaticAsset } from './static-assets'
import { injectNavigationInterceptor } from './html-rewriter'

export interface Env {
  ROUTING_KV: KVNamespace
  NEW_ORIGIN: Fetcher
  VERCEL_HOST: string
  PUBLIC_DOMAIN: string
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)

    // 1. Static assets — route by try-fallback-cache, no KV read needed
    if (url.pathname.startsWith('/_next/static/')) {
      return handleStaticAsset(request, url, env, ctx)
    }

    // 2. Load routing config from KV
    const config = await getRoutingConfig(env.ROUTING_KV)

    // 3. Intercept _next/data requests for migrated pages (Pages Router)
    if (url.pathname.startsWith('/_next/data/')) {
      const parts = url.pathname.split('/')
      const pageParts = parts.slice(4)
      if (pageParts.length > 0) {
        const lastPart = pageParts[pageParts.length - 1]
        pageParts[pageParts.length - 1] = lastPart.replace(/\.json$/, '')

        let pagePath = '/' + pageParts.join('/')
        if (pagePath === '/index') pagePath = '/'

        // Reuse matchRoute() to correctly handle wildcard patterns
        if (matchRoute(pagePath, config.routes) === 'cloudflare') {
          return new Response(JSON.stringify({ notFound: true }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          })
        }
      }

      return proxyToVercel(request, url, env)
    }

    // 4. Route to appropriate origin
    const origin = matchRoute(url.pathname, config.routes)
    const migratedPaths = getMigratedPaths(config.routes)

    if (origin === 'cloudflare') {
      const response = await fetchFromNewOrigin(request, url, env)
      // 'exclude' mode: force hard nav for links NOT in migrated paths
      return injectNavigationInterceptor(response, migratedPaths, 'exclude')
    }

    // 5. Default: proxy to Vercel with HTMLRewriter
    const response = await proxyToVercel(request, url, env)
    // 'include' mode: force hard nav for links TO migrated paths
    return injectNavigationInterceptor(response, migratedPaths, 'include')
  },
} satisfies ExportedHandler<Env>
