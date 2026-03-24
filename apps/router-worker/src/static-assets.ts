import type { Env } from './index'

export async function handleStaticAsset(
  request: Request,
  url: URL,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  // Check edge cache first
  const cache = caches.default
  const cacheKey = new Request(url.toString(), { method: 'GET' })
  const cached = await cache.match(cacheKey)
  if (cached) return cached

  // Try new origin first (service binding = zero latency, same thread)
  let response: Response
  try {
    response = await env.NEW_ORIGIN.fetch(request)
  } catch {
    response = new Response(null, { status: 404 })
  }

  if (response.status === 404) {
    // Not found on new origin, try Vercel
    const vercelUrl = new URL(url.pathname + url.search, `https://${env.VERCEL_HOST}`)
    const headers = new Headers(request.headers)
    headers.set('X-Forwarded-Host', env.PUBLIC_DOMAIN)

    response = await fetch(vercelUrl.toString(), {
      method: 'GET',
      headers,
      redirect: 'manual',
    })
  }

  if (response.ok) {
    // Cache immutable assets at the edge (content-addressed, safe to cache forever)
    const cacheableResponse = new Response(response.body, response)
    cacheableResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    ctx.waitUntil(cache.put(cacheKey, cacheableResponse.clone()))
    return cacheableResponse
  }

  return response
}
