import { revalidateTag } from 'next/cache'

export const dynamic = 'force-dynamic'

const ALLOWED_TAGS = [
  'fetch-ts',
  'unstable-ts',
  'global_suffix-variations',
  'global_default-industry-template',
  'global_default-job-title-template',
  'collection_content-variations',
  'collection_template-overrides',
  'collection_tenants',
  'collection_word-form-sets',
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tag } = body as { tag: string }

    if (!tag || typeof tag !== 'string') {
      return Response.json({ error: 'Missing or invalid "tag" field' }, { status: 400 })
    }

    if (!ALLOWED_TAGS.includes(tag)) {
      return Response.json(
        { error: `Unknown tag "${tag}". Allowed: ${ALLOWED_TAGS.join(', ')}` },
        { status: 400 },
      )
    }

    revalidateTag(tag)

    return Response.json({
      revalidated: true,
      tag,
      now: new Date().toISOString(),
    })
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }
}
