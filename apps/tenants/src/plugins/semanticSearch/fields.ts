import type { Field, FieldHook } from 'payload'

import { sql } from '@payloadcms/db-postgres'

const checkEmbeddingExists: FieldHook = async ({ data, req }) => {
  if (!data?.id) return false
  const db = req.payload.db.drizzle
  const locale = req.locale || 'en'
  const result = await db.execute(
    sql`SELECT embedding IS NOT NULL AS has_embedding
        FROM search_locales
        WHERE _parent_id = ${data.id} AND _locale = ${locale}
        LIMIT 1`,
  )
  return result.rows?.[0]?.has_embedding ?? false
}

export function getSemanticSearchFields(): Field[] {
  return [
    {
      name: 'fullText',
      type: 'textarea',
      localized: true,
      admin: { readOnly: true },
    },
    {
      name: 'sourceSlug',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'industrySlug',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'suffixAdjective',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'suffixResumeWord',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'suffixBuilder',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'suffixContentWord',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'contentType',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'hasEmbedding',
      type: 'checkbox',
      virtual: true,
      admin: { readOnly: true },
      hooks: { afterRead: [checkEmbeddingExists] },
    },
  ]
}
