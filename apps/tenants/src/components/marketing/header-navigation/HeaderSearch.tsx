'use client'

import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SearchMd } from '@untitledui/icons'

import { cx } from '@/utils/styles/cx'

interface SearchResult {
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

const COLLECTION_LABELS: Record<string, string> = {
  'job-titles': 'Job Title',
  'resume-content': 'Content',
}

const COLLECTION_COLORS: Record<string, string> = {
  'job-titles': 'bg-brand-50 text-brand-700 ring-brand-200/60',
  'resume-content': 'bg-emerald-50 text-emerald-700 ring-emerald-200/60',
}

function buildResultHref(result: SearchResult, tenantSlug: string): string | null {
  if (
    result.collection === 'job-titles' &&
    result.sourceSlug &&
    result.industrySlug &&
    result.suffixAdjective &&
    result.suffixResumeWord &&
    result.suffixBuilder &&
    result.suffixContentWord
  ) {
    return `/${tenantSlug}/resumes/${result.industrySlug}/${result.sourceSlug}-${result.suffixAdjective}-${result.suffixResumeWord}-${result.suffixBuilder}-${result.suffixContentWord}`
  }
  return null
}

export function HeaderSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)
  const router = useRouter()
  const params = useParams()
  const tenantSlug = (params.tenantId as string) ?? ''

  // Keyboard shortcut: ⌘K / Ctrl+K
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      setQuery('')
      setResults([])
      setActiveIndex(-1)
    }
  }, [open])

  // Click outside to close
  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  // Debounced search
  const search = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!q.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}&limit=8`)
        const data = (await res.json()) as { results?: SearchResult[] }
        setResults(data.results ?? [])
        setActiveIndex(-1)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 200)
  }, [])

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setQuery(val)
    search(val)
  }

  function navigateToResult(result: SearchResult) {
    const href = buildResultHref(result, tenantSlug)
    if (href) {
      setOpen(false)
      router.push(href)
    }
  }

  function onInputKeyDown(e: React.KeyboardEvent) {
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
      setOpen(false)
    }
  }

  const hasQuery = query.trim().length > 0

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cx(
          'flex items-center gap-2 rounded-lg border border-gray-200/80 bg-white/60 px-2.5 py-1.5 text-sm text-gray-400 shadow-xs transition duration-200',
          'hover:border-gray-300/80 hover:bg-white/80 hover:text-gray-500 hover:shadow-sm',
          'focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none',
        )}
        aria-label="Search"
      >
        <SearchMd className="size-4" />
        <span className="hidden lg:inline">Search</span>
        <kbd className="hidden rounded border border-gray-200 bg-gray-50/80 px-1.5 py-px font-mono text-[10px] font-medium text-gray-400 lg:inline">
          ⌘K
        </kbd>
      </button>

      {/* Overlay + dropdown */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-50 bg-gray-950/10 backdrop-blur-[2px]" aria-hidden />

          {/* Search panel */}
          <div
            className={cx(
              'fixed inset-x-0 top-0 z-50 mx-auto mt-[min(20vh,120px)] w-full max-w-lg px-4',
              'animate-in fade-in slide-in-from-top-2 duration-150',
            )}
          >
            <div className="overflow-hidden rounded-xl bg-white shadow-2xl shadow-gray-900/20 ring-1 ring-gray-900/[0.08]">
              {/* Input row */}
              <div className="flex items-center gap-3 border-b border-gray-100 px-4">
                <SearchMd
                  className={cx(
                    'size-5 shrink-0',
                    loading ? 'animate-pulse text-brand-500' : 'text-gray-400',
                  )}
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={onInputChange}
                  onKeyDown={onInputKeyDown}
                  placeholder="Search job titles, resume content..."
                  className="h-12 w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                  aria-label="Search query"
                  role="combobox"
                  aria-expanded={results.length > 0}
                  aria-activedescendant={
                    activeIndex >= 0 ? `search-result-${activeIndex}` : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="shrink-0 rounded border border-gray-200 bg-gray-50/80 px-1.5 py-0.5 font-mono text-[10px] font-medium text-gray-400 transition hover:bg-gray-100"
                >
                  Esc
                </button>
              </div>

              {/* Results */}
              {hasQuery && (
                <div className="max-h-80 overflow-y-auto overscroll-contain" role="listbox">
                  {results.length > 0 ? (
                    <ul className="py-1.5">
                      {results.map((result, i) => {
                        const href = buildResultHref(result, tenantSlug)
                        return (
                          <li
                            key={`${result.collection}:${result.docId}`}
                            id={`search-result-${i}`}
                            role="option"
                            aria-selected={i === activeIndex}
                          >
                            <a
                              href={href ?? undefined}
                              onClick={(e) => {
                                if (!href) return
                                e.preventDefault()
                                navigateToResult(result)
                              }}
                              className={cx(
                                'mx-1.5 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-75',
                                href ? 'cursor-pointer' : 'cursor-default',
                                i === activeIndex ? 'bg-gray-50' : 'hover:bg-gray-50/60',
                              )}
                            >
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900">
                                  {result.title}
                                </p>
                                {result.contentType && (
                                  <p className="mt-0.5 truncate text-xs text-gray-500">
                                    {result.contentType}
                                  </p>
                                )}
                              </div>
                              <span
                                className={cx(
                                  'shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset',
                                  COLLECTION_COLORS[result.collection] ??
                                    'bg-gray-50 text-gray-600 ring-gray-200/60',
                                )}
                              >
                                {COLLECTION_LABELS[result.collection] ?? result.collection}
                              </span>
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  ) : !loading ? (
                    <div className="px-4 py-8 text-center text-sm text-gray-400">
                      No results for &ldquo;{query}&rdquo;
                    </div>
                  ) : null}
                </div>
              )}

              {/* Empty state hint */}
              {!hasQuery && (
                <div className="px-4 py-6 text-center text-xs text-gray-400">
                  Type to search across job titles and resume content
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
