import { NextRequest, NextResponse } from 'next/server'

/**
 * Domain-to-tenant slug mapping.
 *
 * For MVP, this is a static map loaded from an environment variable.
 * Format: JSON object like {"resumebuilder.com":"resume-builder","cvmaker.io":"cv-maker"}
 *
 * For production scale, this can be replaced with a Cloudflare KV lookup
 * or a Payload afterChange hook that updates an edge config.
 */
function getTenantSlugFromHost(hostname: string): string | null {
  const domain = hostname.split(':')[0]

  const mapJson = process.env.DOMAIN_TENANT_MAP
  if (mapJson) {
    try {
      const map: Record<string, string> = JSON.parse(mapJson)
      if (map[domain]) return map[domain]
    } catch {
      // Invalid JSON, fall through
    }
  }

  return null
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host') || ''

  const draftTenant = request.cookies.get('x-draft-tenant')?.value
  const tenantSlug = getTenantSlugFromHost(host) || draftTenant || process.env.DEFAULT_TENANT_SLUG || null
  if (!tenantSlug) return NextResponse.next()

  // Rewrite by prepending tenant slug: /resume-ideas → /{tenant}/resume-ideas
  const url = request.nextUrl.clone()
  url.pathname = `/${tenantSlug}${pathname}`

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-tenant-slug', tenantSlug)

  return NextResponse.rewrite(url, { request: { headers: requestHeaders } })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|admin|next|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|css|js|woff2?|ttf|eot)).*)',
  ],
}
