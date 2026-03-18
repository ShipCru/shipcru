import type { GlobalAfterChangeHook } from 'payload'

import { sql } from '@payloadcms/db-postgres'

import { getSuffixWords } from '@/globals/SuffixVariations/queries/getSuffixWords'
import { resolveCanonicalSuffix } from '@/lib/resume-pages/resolveCanonicalSuffix'
import type { JobTitle } from '@/payload-types'

export const resyncSuffixOnGlobalChange: GlobalAfterChangeHook = async ({
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return

  try {
    const suffixData = await getSuffixWords(payload)
    const globalSuffix = await resolveCanonicalSuffix(payload, {}, suffixData)

    if (!globalSuffix) {
      payload.logger.warn('No global canonical suffix configured, skipping re-sync')
      return
    }

    const db = payload.db.drizzle

    // Find job titles with per-title overrides so we can exclude them from the batch update
    const overrideResult = await payload.find({
      collection: 'job-titles',
      where: { overrideSuffix: { equals: true } },
      limit: 0,
      depth: 0,
    })

    const overrideCount = overrideResult.totalDocs
    const overrideDocs =
      overrideCount > 0
        ? await payload.find({
            collection: 'job-titles',
            where: { overrideSuffix: { equals: true } },
            limit: overrideCount,
            depth: 0,
          })
        : { docs: [] as JobTitle[] }

    // Batch update all job-title search entries with the global canonical suffix.
    // The search plugin stores polymorphic relationships in search_rels; we join
    // on that to target only job-title entries.
    await db.execute(sql`
      UPDATE search s SET
        suffix_adjective = ${globalSuffix.adjective},
        suffix_resume_word = ${globalSuffix.resumeWord},
        suffix_builder = ${globalSuffix.builder},
        suffix_content_word = ${globalSuffix.contentWord}
      FROM search_rels sr
      WHERE sr.parent_id = s.id
        AND sr.path = 'doc'
        AND sr.job_titles_id IS NOT NULL
    `)

    // Re-apply per-title overrides (typically very few).
    // depth: 0 means relationship fields are IDs, matching resolveCanonicalSuffix's expected shape.
    for (const jobTitle of overrideDocs.docs) {
      const suffix = await resolveCanonicalSuffix(
        payload,
        jobTitle as Parameters<typeof resolveCanonicalSuffix>[1],
        suffixData,
      )
      if (!suffix) continue

      await db.execute(sql`
        UPDATE search s SET
          suffix_adjective = ${suffix.adjective},
          suffix_resume_word = ${suffix.resumeWord},
          suffix_builder = ${suffix.builder},
          suffix_content_word = ${suffix.contentWord}
        FROM search_rels sr
        WHERE sr.parent_id = s.id
          AND sr.path = 'doc'
          AND sr.job_titles_id = ${jobTitle.id}
      `)
    }

    payload.logger.info(
      `Re-synced suffix: batch update + ${overrideDocs.docs.length} overrides`,
    )
  } catch (err) {
    payload.logger.error({ err, msg: 'Failed to re-sync suffix on global change' })
  }
}
