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

  // Try env var JSON map first
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

  console.log(`[middleware] incoming: host=${host} pathname=${pathname}`)

  // Only intercept /resumes/* routes (at least one segment after /resumes/)
  if (!pathname.startsWith('/resumes/')) {
    console.log(`[middleware] skipping non-resumes path: ${pathname}`)
    return NextResponse.next()
  }

  const tenantSlug = getTenantSlugFromHost(host) || process.env.DEFAULT_TENANT_SLUG || null

  console.log(`[middleware] resolved tenantSlug=${tenantSlug} (host=${host}, DEFAULT_TENANT_SLUG=${process.env.DEFAULT_TENANT_SLUG || '<unset>'}, DOMAIN_TENANT_MAP=${process.env.DOMAIN_TENANT_MAP ? 'set' : '<unset>'})`)

  if (!tenantSlug) {
    // No tenant resolved -- let the route handle 404
    console.log(`[middleware] no tenant resolved, passing through`)
    return NextResponse.next()
  }

  // Rewrite: /resumes/advertising → /resumes/{tenantSlug}/advertising (internal)
  const segments = pathname.slice('/resumes/'.length)
  const url = request.nextUrl.clone()
  url.pathname = `/resumes/${tenantSlug}/${segments}`

  console.log(`[middleware] rewriting: ${pathname} → ${url.pathname}`)

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/resumes/:path+'],
}
