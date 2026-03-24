import type { Env } from './index'

export async function proxyToVercel(
  request: Request,
  url: URL,
  env: Env,
): Promise<Response> {
  const vercelUrl = new URL(url.pathname + url.search, `https://${env.VERCEL_HOST}`)

  const headers = new Headers(request.headers)
  headers.set('X-Forwarded-Host', env.PUBLIC_DOMAIN)
  // Remove cf-connecting-ip to avoid Vercel confusion
  headers.delete('cf-connecting-ip')

  const response = await fetch(vercelUrl.toString(), {
    method: request.method,
    headers,
    body: request.body,
    redirect: 'manual',
  })

  return rewriteResponseHeaders(response, env)
}

function rewriteResponseHeaders(response: Response, env: Env): Response {
  const location = response.headers.get('Location')
  if (!location) return response

  // Rewrite Vercel origin hostname in Location header
  const rewritten = location.replaceAll(env.VERCEL_HOST, env.PUBLIC_DOMAIN)

  if (rewritten === location) return response

  const newHeaders = new Headers(response.headers)
  newHeaders.set('Location', rewritten)

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  })
}
