'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

const tags = [
  { tag: 'fetch-ts', label: 'Revalidate fetch-ts', color: 'green' },
  { tag: 'unstable-ts', label: 'Revalidate unstable-ts', color: 'blue' },
] as const

export function RevalidateButtons() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<Record<string, string>>({})

  async function handleRevalidate(tag: string) {
    const res = await fetch('/api/revalidate-tag', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag }),
    })
    const data = (await res.json()) as { revalidated?: boolean; now?: string }

    if (data.revalidated && data.now) {
      setStatus((prev) => ({ ...prev, [tag]: data.now as string }))
    }

    startTransition(() => {
      router.refresh()
    })
  }

  function handleRefresh() {
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <div className="rounded-lg border border-yellow-500 bg-yellow-950 p-6">
      <h2 className="mb-1 text-lg font-bold text-yellow-400">Revalidation Controls</h2>
      <p className="mb-4 text-sm text-yellow-300">
        Revalidate a tag then observe which sections update. &quot;Refresh Page&quot; re-renders
        without invalidating cache.
      </p>

      <div className="flex flex-wrap gap-3">
        {tags.map(({ tag, label, color }) => (
          <button
            key={tag}
            onClick={() => handleRevalidate(tag)}
            disabled={isPending}
            className={`rounded border border-${color}-500 bg-${color}-900 px-4 py-2 text-sm font-medium text-${color}-200 transition hover:bg-${color}-800 disabled:opacity-50`}
          >
            {isPending ? 'Pending...' : label}
          </button>
        ))}

        <button
          onClick={handleRefresh}
          disabled={isPending}
          className="rounded border border-gray-500 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-gray-700 disabled:opacity-50"
        >
          {isPending ? 'Refreshing...' : 'Refresh Page'}
        </button>
      </div>

      {Object.keys(status).length > 0 && (
        <div className="mt-3 space-y-1 text-xs text-yellow-300/70">
          {Object.entries(status).map(([tag, time]) => (
            <p key={tag}>
              Last revalidated <code className="rounded bg-yellow-900 px-1">{tag}</code> at{' '}
              <code className="font-mono">{time}</code>
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
