import { generateSitemaps as getJobTitleSitemaps } from '../(sitemap)/jobtitles/sitemap'
import { resolveSitemapTenantContext } from '@/lib/sitemaps/resolveBaseUrl'

export const revalidate = 86400

function sitemapEntry(loc: string) {
  return `<sitemap><loc>${loc}</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>`
}

export async function GET() {
  const ctx = await resolveSitemapTenantContext()
  if (!ctx) {
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>`,
      { headers: { 'Content-Type': 'application/xml' } },
    )
  }

  const { baseUrl } = ctx

  const jtSitemaps = await getJobTitleSitemaps()

  const entries = [
    sitemapEntry(`${baseUrl}/pages/sitemap.xml`),
    sitemapEntry(`${baseUrl}/landings/sitemap.xml`),
    sitemapEntry(`${baseUrl}/industries/sitemap.xml`),
    ...jtSitemaps.map(({ id }) =>
      sitemapEntry(`${baseUrl}/jobtitles/sitemap/${id}.xml`),
    ),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</sitemapindex>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
