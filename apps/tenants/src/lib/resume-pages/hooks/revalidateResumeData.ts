import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import { generateCacheTag } from '@/utilities/generateCacheTag'

export function createGlobalRevalidationHook(globalSlug: string): GlobalAfterChangeHook {
  return ({ req: { payload, context } }) => {
    if (context.disableRevalidate) return

    const tag = generateCacheTag({ type: 'global', slug: globalSlug })
    payload.logger.info(`Revalidating cache tag: ${tag}`)
    revalidateTag(tag)
    revalidatePath('/resumes', 'layout')
  }
}

export function createCollectionRevalidationHook(
  collectionSlug: string,
): CollectionAfterChangeHook {
  return ({ req: { payload, context } }) => {
    if (context.disableRevalidate) return

    const tag = generateCacheTag({ type: 'collection', collection: collectionSlug })
    payload.logger.info(`Revalidating cache tag: ${tag}`)
    revalidateTag(tag)
    revalidatePath('/resumes', 'layout')
  }
}

export function createCollectionDeleteRevalidationHook(
  collectionSlug: string,
): CollectionAfterDeleteHook {
  return ({ req: { payload, context } }) => {
    if (context.disableRevalidate) return

    const tag = generateCacheTag({ type: 'collection', collection: collectionSlug })
    payload.logger.info(`Revalidating cache tag: ${tag}`)
    revalidateTag(tag)
    revalidatePath('/resumes', 'layout')
  }
}
