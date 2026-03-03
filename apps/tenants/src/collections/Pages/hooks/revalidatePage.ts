import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

// TODO: Implement actual page revalidation (e.g. Next.js revalidatePath)
export const revalidatePage: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating page: ${doc.slug}`)
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      payload.logger.info(`Revalidating unpublished page: ${previousDoc.slug}`)
    }
  }
  return doc
}

// TODO: Implement actual page revalidation on delete
export const revalidateDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context, payload },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating deleted page: ${doc.slug}`)
  }

  return doc
}
