import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

import { trigramSearch } from '@/lib/search/trigramSearch'
import { vectorSearch } from '@/lib/search/vectorSearch'
import { mergeResults } from '@/lib/search/mergeResults'

export const dynamic = 'force-dynamic'

const MIN_SCORE = 0.3

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q')
  if (!query || !query.trim()) {
    return Response.json({ results: [] })
  }

  const collection = req.nextUrl.searchParams.get('collection') ?? undefined
  const locale = req.nextUrl.searchParams.get('locale') ?? 'en'
  const limit = Math.min(
    parseInt(req.nextUrl.searchParams.get('limit') ?? '20', 10) || 20,
    100,
  )

  const payload = await getPayload({ config })

  const [trigramResults, vectorResults] = await Promise.all([
    trigramSearch(payload, query.trim(), { collection, locale, limit }),
    vectorSearch(payload, query.trim(), { collection, locale, limit }),
  ])

  const results = mergeResults(trigramResults, vectorResults, limit)
    .filter((r) => r.score >= MIN_SCORE)

  return Response.json({ results })
}
