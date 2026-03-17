'use client'

import { useEffect, useState } from 'react'
import { useRowLabel } from '@payloadcms/ui'

const SuffixVariationRowLabel: React.FC = () => {
  const { data, rowNumber } = useRowLabel<{
    wordFormSet?: { name?: string } | string | number
    weight?: number
    isCanonical?: boolean
  }>()

  const [name, setName] = useState<string | null>(null)

  const wordFormSet = data?.wordFormSet
  const populatedName =
    typeof wordFormSet === 'object' && wordFormSet !== null ? (wordFormSet.name ?? null) : null
  const rawId =
    typeof wordFormSet === 'string'
      ? wordFormSet
      : typeof wordFormSet === 'number'
        ? String(wordFormSet)
        : null

  useEffect(() => {
    if (populatedName) {
      setName(populatedName)
      return
    }
    if (!rawId) {
      setName(null)
      return
    }

    let cancelled = false
    fetch(`/api/word-form-sets/${rawId}?depth=0`)
      .then((res) => (res.ok ? res.json() : null))
      .then((doc: { name?: string } | null) => {
        if (!cancelled) setName(doc?.name ?? null)
      })
      .catch(() => {
        if (!cancelled) setName(null)
      })
    return () => {
      cancelled = true
    }
  }, [rawId, populatedName])

  if (!name) {
    const row = rowNumber !== undefined ? rowNumber + 1 : ''
    return <span>Item {row}</span>
  }

  const parts: string[] = [name]
  if (data?.weight && data.weight > 1) {
    parts.push(`(w:${data.weight})`)
  }
  if (data?.isCanonical) {
    parts.push('\u2605')
  }

  return <span>{parts.join(' ')}</span>
}

export default SuffixVariationRowLabel
