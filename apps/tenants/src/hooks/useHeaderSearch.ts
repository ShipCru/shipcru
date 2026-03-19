'use client'

import { useRouter } from 'next/navigation'
import { type ChangeEvent, type KeyboardEvent, useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

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

export type SearchResultWithHref = SearchResult & { href: string | null }

function buildResultHref(result: SearchResult): string | null {
  if (
    result.collection === 'job-titles' &&
    result.sourceSlug &&
    result.industrySlug &&
    result.suffixAdjective &&
    result.suffixResumeWord &&
    result.suffixBuilder &&
    result.suffixContentWord
  ) {
    return `/resumes/${result.industrySlug}/${result.sourceSlug}-${result.suffixAdjective}-${result.suffixResumeWord}-${result.suffixBuilder}-${result.suffixContentWord}`
  }
  return null
}

export function useHeaderSearch(open: boolean, onClose: () => void) {
  const [query, setQuery] = useState('')
  const [rawResults, setRawResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const router = useRouter()
  const [debouncedQuery] = useDebounceValue(query, 300)

  useEffect(() => {
    if (!open) {
      setQuery('')
      setRawResults([])
      setActiveIndex(-1)
      setLoading(false)
    }
  }, [open])

  useEffect(() => {
    if (!debouncedQuery.trim()) return

    const controller = new AbortController()

    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery.trim())}&limit=8`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data: { results?: SearchResult[] }) => {
        setRawResults(data.results ?? [])
        setActiveIndex(-1)
      })
      .catch((err) => {
        if (err instanceof Error && err.name !== 'AbortError') setRawResults([])
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [debouncedQuery])

  const results: SearchResultWithHref[] = rawResults.map((r) => ({
    ...r,
    href: buildResultHref(r),
  }))

  function navigateToResult(result: SearchResultWithHref) {
    if (result.href) {
      onClose()
      router.push(result.href)
    }
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setQuery(val)
    if (val.trim()) {
      setLoading(true)
    } else {
      setRawResults([])
      setLoading(false)
    }
  }

  function onInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      navigateToResult(results[activeIndex])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return {
    query,
    results,
    loading,
    activeIndex,
    hasQuery: query.trim().length > 0,
    onInputChange,
    onInputKeyDown,
    navigateToResult,
  }
}
