'use client'

import { Copy01, Check } from '@untitledui/icons'
import { useCallback, useState } from 'react'

export function CopyableUrl({ url, children }: { url: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [url])

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={url}
      className="group flex w-full cursor-copy appearance-none items-center gap-1 break-all rounded border-0 bg-(--theme-elevation-100) px-1.5 py-0.5 text-left text-[11px] text-(--theme-elevation-800) outline-none transition-colors hover:bg-(--theme-elevation-200) focus-visible:ring-1 focus-visible:ring-(--theme-elevation-300)"
    >
      <code className="min-w-0 flex-1">
        {copied ? (
          <span className="text-(--theme-elevation-500)">Copied!</span>
        ) : (
          children
        )}
      </code>
      {copied ? (
        <Check className="h-3 w-3 shrink-0 opacity-40" aria-hidden="true" />
      ) : (
        <Copy01
          className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-40"
          aria-hidden="true"
        />
      )}
    </button>
  )
}
