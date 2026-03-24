import type { Env } from './index'
import { proxyToVercel } from './vercel-proxy'

export async function fetchFromNewOrigin(
  request: Request,
  url: URL,
  env: Env,
): Promise<Response> {
  try {
    // Service bindings don't support AbortController signal — use Promise.race for timeout
    const response = await Promise.race([
      env.NEW_ORIGIN.fetch(request),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 5000),
      ),
    ])

    // Safety: check for accidental noindex injection
    const xRobotsTag = response.headers.get('X-Robots-Tag')
    if (xRobotsTag?.toLowerCase().includes('noindex')) {
      console.error(JSON.stringify({
        event: 'noindex_detected',
        path: url.pathname,
        origin: 'cloudflare',
      }))
      return proxyToVercel(request, url, env)
    }

    // 5xx from new origin → fallback
    if (response.status >= 500) {
      console.error(JSON.stringify({
        event: 'origin_5xx',
        path: url.pathname,
        status: response.status,
      }))
      return proxyToVercel(request, url, env)
    }

    return response
  } catch (err) {
    console.error(JSON.stringify({
      event: 'origin_error',
      path: url.pathname,
      error: String(err),
    }))
    return proxyToVercel(request, url, env)
  }
}
