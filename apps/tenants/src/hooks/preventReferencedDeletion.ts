import type { CollectionBeforeDeleteHook, CollectionSlug } from 'payload'

import { APIError } from 'payload'

interface ReferenceCheck {
  /** The collection slug to search for references in */
  collection: string
  /** The field path that holds the reference (dot-notation for nested fields) */
  field: string
}

/**
 * Creates a beforeDelete hook that prevents deletion if the document
 * is referenced by other documents in the specified collections/fields.
 *
 * Usage:
 * ```
 * hooks: {
 *   beforeDelete: [
 *     preventReferencedDeletion([
 *       { collection: 'template-overrides', field: 'sectionOverrides.variationSet' },
 *     ]),
 *   ],
 * }
 * ```
 */
export function preventReferencedDeletion(
  references: ReferenceCheck[],
): CollectionBeforeDeleteHook {
  return async ({ id, req }) => {
    const referencingDocs: string[] = []

    for (const ref of references) {
      const result = await req.payload.find({
        collection: ref.collection as CollectionSlug,
        where: {
          [ref.field]: { equals: id },
        },
        limit: 1,
        depth: 0,
        req,
      })

      if (result.totalDocs > 0) {
        referencingDocs.push(`${ref.collection} (field: ${ref.field})`)
      }
    }

    if (referencingDocs.length > 0) {
      throw new APIError(
        `This document is referenced by: ${referencingDocs.join(', ')}. Remove references first.`,
        400,
      )
    }
  }
}
