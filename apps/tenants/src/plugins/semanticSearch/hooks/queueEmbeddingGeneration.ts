import type { CollectionAfterChangeHook } from 'payload'

export const queueSearchEmbeddingGeneration: CollectionAfterChangeHook = async ({
  collection,
  doc,
  req,
}) => {
  try {
    // Skip if there's already a pending job for this doc
    const existing = await req.payload.find({
      collection: 'payload-jobs',
      where: {
        taskSlug: { equals: 'generateSearchEmbedding' },
        'input.docId': { equals: doc.id },
        'input.collection': { equals: collection.slug },
        completedAt: { exists: false },
        hasError: { not_equals: true },
      },
      limit: 1,
      req,
    })

    if (existing.docs.length > 0) return

    await req.payload.jobs.queue({
      task: 'generateSearchEmbedding',
      input: {
        docId: doc.id,
        collection: collection.slug,
      },
      req,
    })
  } catch (err) {
    req.payload.logger.error({
      err,
      msg: `Failed to queue embedding generation for ${collection.slug}/${doc.id}`,
    })
  }
}
