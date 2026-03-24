export interface RoutingConfig {
  routes: Record<string, 'cloudflare' | 'vercel'>
}

export async function getRoutingConfig(kv: KVNamespace): Promise<RoutingConfig> {
  const config = await kv.get<RoutingConfig>('routing-config', { type: 'json' })
  return config ?? { routes: {} }
}

export function matchRoute(
  pathname: string,
  routes: Record<string, 'cloudflare' | 'vercel'>,
): 'cloudflare' | 'vercel' {
  // Exact match first
  if (routes[pathname]) return routes[pathname]

  // Wildcard match: "/blog/*" matches "/blog/anything/here"
  // Sort by prefix length descending so more specific wildcards match first
  const wildcardEntries = Object.entries(routes)
    .filter(([p]) => p.endsWith('/*'))
    .sort(([a], [b]) => b.length - a.length)

  for (const [pattern, target] of wildcardEntries) {
    const prefix = pattern.slice(0, -2)
    if (pathname === prefix || pathname.startsWith(prefix + '/')) {
      return target
    }
  }

  return 'vercel' // default fallback
}

export function getMigratedPaths(routes: Record<string, 'cloudflare' | 'vercel'>): string[] {
  return Object.entries(routes)
    .filter(([, target]) => target === 'cloudflare')
    .map(([path]) => path)
}
