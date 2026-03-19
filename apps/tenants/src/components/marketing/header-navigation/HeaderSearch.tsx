'use client'

import Link from 'next/link'
import { useCallback, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { SearchMd } from '@untitledui/icons'

import { type SearchResultWithHref, useHeaderSearch } from '@/hooks/useHeaderSearch'
import { useSearchPanel } from '@/hooks/useSearchPanel'
import { cx } from '@/utils/styles/cx'

const COLLECTION_LABELS: Record<string, string> = {
  'job-titles': 'Job Title',
  'resume-content': 'Content',
}

const COLLECTION_COLORS: Record<string, string> = {
  'job-titles': 'bg-brand-50 text-brand-700 ring-brand-200/60',
  'resume-content': 'bg-emerald-50 text-emerald-700 ring-emerald-200/60',
}

export function HeaderSearch() {
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { open, setOpen } = useSearchPanel(inputRef)
  const close = useCallback(() => setOpen(false), [setOpen])
  const search = useHeaderSearch(open, close)

  useOnClickOutside(containerRef, close)

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
            <div className="overflow-hidden rounded-xl bg-white shadow-2xl shadow-gray-900/20 ring-1 ring-gray-900/8">
              {/* Input row */}
              <div className="flex items-center gap-3 border-b border-gray-100 px-4">
                <SearchMd
                  className={cx(
                    'size-5 shrink-0',
                    search.loading ? 'animate-pulse text-brand-500' : 'text-gray-400',
                  )}
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={search.query}
                  onChange={search.onInputChange}
                  onKeyDown={search.onInputKeyDown}
                  placeholder="Search job titles, resume content..."
                  className="h-12 w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                  aria-label="Search query"
                  role="combobox"
                  aria-controls="search-listbox"
                  aria-expanded={search.hasQuery}
                  aria-activedescendant={
                    search.activeIndex >= 0 ? `search-result-${search.activeIndex}` : undefined
                  }
                />
                <button
                  type="button"
                  onClick={close}
                  className="shrink-0 rounded border border-gray-200 bg-gray-50/80 px-1.5 py-0.5 font-mono text-[10px] font-medium text-gray-400 transition hover:bg-gray-100"
                >
                  Esc
                </button>
              </div>

              {/* Results */}
              {search.hasQuery && (
                <div
                  id="search-listbox"
                  className=""
                  role="listbox"
                >
                  {search.results.length > 0 ? (
                    <ul className="py-1.5">
                      {search.results.map((result: SearchResultWithHref, i: number) => (
                        <li
                          key={`${result.collection}:${result.docId}`}
                          id={`search-result-${i}`}
                          role="option"
                          aria-selected={i === search.activeIndex}
                        >
                          <Link
                            href={result.href ?? '#'}
                            onClick={result.href ? close : (e) => e.preventDefault()}
                            className={cx(
                              'mx-1.5 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-75',
                              result.href ? 'cursor-pointer' : 'cursor-default',
                              i === search.activeIndex ? 'bg-gray-50' : 'hover:bg-gray-50/60',
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
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : !search.loading ? (
                    <div className="px-4 py-8 text-center text-sm text-gray-400">
                      No results for &ldquo;{search.query}&rdquo;
                    </div>
                  ) : null}
                </div>
              )}

              {/* Empty state hint */}
              {!search.hasQuery && (
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
