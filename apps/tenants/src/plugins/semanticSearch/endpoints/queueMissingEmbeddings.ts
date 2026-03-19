import type { Endpoint } from 'payload'

import { APIError } from 'payload'
import { sql } from '@payloadcms/db-postgres'

export interface QueueMissingEmbeddingsResult {
  queued: number
  skipped: number
  total: number
}

export const queueMissingEmbeddingsEndpoint: Endpoint = {
  path: '/queue-missing-embeddings',
  method: 'post',
  handler: async (req) => {
    if (!req.user) {
      throw new APIError('Unauthorized', 401)
    }

    const { payload } = req
    const db = payload.db.drizzle

    // Find all search docs that have no embedding for the 'en' locale
    const missingResult = await db.execute(sql`
      SELECT s.id
      FROM search s
      LEFT JOIN search_locales sl ON sl._parent_id = s.id AND sl._locale = 'en'
      WHERE sl.embedding IS NULL
    `)

    const missingIds = (missingResult.rows as { id: number }[]).map((r) => r.id)

    if (missingIds.length === 0) {
      return Response.json({
        queued: 0,
        skipped: 0,
        total: 0,
      } satisfies QueueMissingEmbeddingsResult)
    }

    // Fetch pending jobs in one batch to avoid re-queuing duplicates
    const pendingJobs = await payload.find({
      collection: 'payload-jobs',
      where: {
        taskSlug: { equals: 'generateSearchEmbedding' },
        completedAt: { exists: false },
        hasError: { not_equals: true },
      },
      limit: 10000,
      depth: 0,
      req,
    })

    // Collect queued source doc IDs to exclude from the fetch
    const queuedSourceIds = pendingJobs.docs
      .map((job) => (job.input as { docId?: number }).docId)
      .filter((id): id is number => id != null)

    // Fetch only search docs not already queued (depth: 0 — doc.value is the raw ID)
    const searchDocs = await payload.find({
      collection: 'search',
      where: {
        and: [
          { id: { in: missingIds } },
          ...(queuedSourceIds.length > 0 ? [{ 'doc.value': { not_in: queuedSourceIds } }] : []),
        ],
      },
      limit: missingIds.length,
      depth: 0,
      req,
    })

    let queued = 0

    for (const searchDoc of searchDocs.docs) {
      const docRelation = searchDoc.doc
      const sourceId =
        typeof docRelation.value === 'number' ? docRelation.value : docRelation.value.id
      const collection = docRelation.relationTo

      await payload.jobs.queue({
        task: 'generateSearchEmbedding',
        input: { docId: sourceId, collection },
        req,
      })

      queued++
    }

    const skipped = missingIds.length - queued

    return Response.json({
      queued,
      skipped,
      total: missingIds.length,
    } satisfies QueueMissingEmbeddingsResult)
  },
}
