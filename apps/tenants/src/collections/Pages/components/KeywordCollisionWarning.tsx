'use client'

import type { TemplateWordPools } from '@/lib/keyword-landings/templatePatterns'

import React, { useEffect, useState } from 'react'
import { useFormFields } from '@payloadcms/ui'

import { isValidKeywordSlug } from '@/lib/keyword-landings/templatePatterns'

interface WordFormSetDoc {
  rw_singular?: string
  adj_singular?: string
  v_worder?: string
  v_singular?: string
  cw_plural?: string
}

interface WeightedEntry {
  wordFormSet?: WordFormSetDoc | number | null
}

interface SuffixVariationsResponse {
  resumeWords?: WeightedEntry[]
  adjectives?: WeightedEntry[]
  builders?: WeightedEntry[]
  contentWords?: WeightedEntry[]
}

function extractWord(items: WeightedEntry[] | undefined, field: keyof WordFormSetDoc): string[] {
  return (items ?? []).flatMap((item) => {
    const doc = item.wordFormSet
    if (!doc || typeof doc === 'number') return []
    const value = doc[field]
    return typeof value === 'string' && value ? [value] : []
  })
}

export const KeywordCollisionWarning: React.FC = () => {
  const slug = useFormFields(([fields]) => fields.slug?.value as string | undefined)
  const parent = useFormFields(([fields]) => fields.parent?.value)
  const [pools, setPools] = useState<TemplateWordPools | null>(null)

  useEffect(() => {
    fetch('/api/globals/suffix-variations?depth=1')
      .then((res) => res.json())
      .then((data: SuffixVariationsResponse) => {
        setPools({
          resume: extractWord(data.resumeWords, 'rw_singular'),
          verb: extractWord(data.builders, 'v_singular'),
          verber: extractWord(data.builders, 'v_worder'),
          adjective: extractWord(data.adjectives, 'adj_singular'),
          contentWord: extractWord(data.contentWords, 'cw_plural'),
        })
      })
      .catch(() => {})
  }, [])

  if (!pools || !slug || parent) return null
  if (!isValidKeywordSlug(slug, pools)) return null

  return (
    <div className="-mt-2 mb-4 rounded-md border border-amber-400 bg-amber-50 px-3 py-2.5 text-[13px] leading-snug text-amber-900 dark:border-amber-600 dark:bg-amber-950/40 dark:text-amber-200">
      This slug matches an auto-generated keyword landing page. Saving this page will override the
      generated version &mdash; the keyword landing will no longer be served for{' '}
      <strong>&ldquo;/{slug}&rdquo;</strong>.
    </div>
  )
}
