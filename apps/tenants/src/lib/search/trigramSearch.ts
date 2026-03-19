import type { Payload } from 'payload'

import { sql } from '@payloadcms/db-postgres'

export interface SearchResult {
  id: number
  title: string
  collection: string
  score: number
  docId: number
  sourceSlug: string | null
  industrySlug: string | null
  suffixAdjective: string | null
  suffixResumeWord: string | null
  suffixBuilder: string | null
  suffixContentWord: string | null
  contentType: string | null
}

export async function trigramSearch(
  payload: Payload,
  query: string,
  options: {
    collection?: string
    locale?: string
    limit?: number
  } = {},
): Promise<SearchResult[]> {
  const { collection, locale = 'en', limit = 20 } = options
  const db = payload.db.drizzle

  const collectionFilter =
    collection === 'job-titles'
      ? sql`AND sr."job_titles_id" IS NOT NULL`
      : collection === 'resume-content'
        ? sql`AND sr."resume_content_id" IS NOT NULL`
        : sql``

  const results = await db.execute(sql`
    SELECT
      s."id",
      sl."title",
      CASE
        WHEN sr."job_titles_id" IS NOT NULL THEN 'job-titles'
        WHEN sr."resume_content_id" IS NOT NULL THEN 'resume-content'
      END AS "collection",
      COALESCE(sr."job_titles_id", sr."resume_content_id") AS "docId",
      s."source_slug" AS "sourceSlug",
      s."industry_slug" AS "industrySlug",
      s."suffix_adjective" AS "suffixAdjective",
      s."suffix_resume_word" AS "suffixResumeWord",
      s."suffix_builder" AS "suffixBuilder",
      s."suffix_content_word" AS "suffixContentWord",
      s."content_type" AS "contentType",
      GREATEST(
        similarity(sl."title", ${query}),
        word_similarity(${query}, sl."title")
      ) AS "score"
    FROM "search" s
    JOIN "search_locales" sl ON sl."_parent_id" = s."id" AND sl."_locale" = ${locale}
    JOIN "search_rels" sr ON sr."parent_id" = s."id" AND sr."path" = 'doc'
    WHERE sl."title" % ${query}
       OR ${query} <% sl."title"
    ${collectionFilter}
    ORDER BY GREATEST(
      similarity(sl."title", ${query}),
      word_similarity(${query}, sl."title")
    ) DESC
    LIMIT ${limit}
  `)

  return results.rows as unknown as SearchResult[]
}
