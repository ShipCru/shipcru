import type { Page } from '@/payload-types'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import { getPathFromBreadcrumbs } from '@/utils/buildUrl'

function revalidateCachedPage(
  doc: Pick<Page, 'breadcrumbs'>,
  payload: { logger: { info: (msg: string) => void } },
): void {
  const slug = getPathFromBreadcrumbs(doc.breadcrumbs)
  const path = !slug || slug === 'home' ? '/' : `/${slug}`

  payload.logger.info(`Revalidating page at path: ${path}`)
  revalidatePath(path)
}

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      revalidateCachedPage(doc, payload)
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidateCachedPage(previousDoc, payload)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({
  doc,
  req: { context, payload },
}) => {
  if (!context.disableRevalidate) {
    revalidateCachedPage(doc, payload)
  }

  return doc
}
