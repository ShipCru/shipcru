import type { TaskConfig } from 'payload'

import { sql } from '@payloadcms/db-postgres'

import { generateEmbedding, vectorToString } from '@/lib/embedding/generateEmbedding'

type GenerateSearchEmbeddingIO = {
  input: { collection: string; docId: number }
  output: object
}

export const generateSearchEmbeddingTask: TaskConfig<GenerateSearchEmbeddingIO> = {
  slug: 'generateSearchEmbedding',
  inputSchema: [
    { name: 'docId', type: 'number', required: true },
    { name: 'collection', type: 'text', required: true },
  ],
  handler: async ({ input, req }) => {
    const { collection, docId } = input
    const { payload } = req

    const searchDocs = await payload.find({
      collection: 'search',
      where: {
        'doc.value': { equals: String(docId) },
        'doc.relationTo': { equals: collection },
      },
      limit: 1,
      req,
    })

    if (!searchDocs.docs.length) {
      payload.logger.warn(`No search doc found for ${collection}/${docId}`)
      return { output: {} }
    }

    const searchDoc = searchDocs.docs[0]
    const fullText = searchDoc.fullText

    if (!fullText) {
      payload.logger.info(`No full text for ${collection}/${docId}, skipping embedding`)
      return { output: {} }
    }

    const embedding = await generateEmbedding(fullText)
    const vectorStr = vectorToString(embedding)

    const db = payload.db.drizzle
    const locale = req.locale || 'en'

    await db.execute(
      sql`UPDATE search_locales
          SET embedding = ${vectorStr}::vector
          WHERE _parent_id = ${searchDoc.id}
            AND _locale = ${locale}`,
    )

    payload.logger.info(`Generated embedding for ${collection}/${docId} (locale: ${locale})`)
    return { output: {} }
  },
}
