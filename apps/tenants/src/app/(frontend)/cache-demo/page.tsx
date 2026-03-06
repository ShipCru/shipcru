import { unstable_cache } from 'next/cache'

import { getServerSideURL } from '@/utils/getURL'

import { RevalidateButtons } from './RevalidateButtons'

type TimestampData = { timestamp: number; iso: string; rand: number }

async function fetchTimestamp(
  url: string,
  options: RequestInit & { next?: { tags?: string[]; revalidate?: number } },
): Promise<TimestampData | { error: string }> {
  try {
    const res = await fetch(url, options)
    if (!res.ok) return { error: `HTTP ${res.status}: ${res.statusText}` }
    return await res.json()
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

function TimestampDisplay({ data, label }: { data: TimestampData | { error: string }; label: string }) {
  if ('error' in data) {
    return (
      <div className="rounded border border-red-500 bg-red-950 p-3">
        <p className="text-sm font-medium text-red-400">{label} — Error</p>
        <p className="font-mono text-xs text-red-300">{data.error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <p className="font-mono text-sm">
        <span className="text-gray-400">ISO:</span> {data.iso}
      </p>
      <p className="font-mono text-sm">
        <span className="text-gray-400">Epoch:</span> {data.timestamp}
      </p>
      <p className="font-mono text-sm">
        <span className="text-gray-400">Rand:</span> {data.rand.toFixed(6)}
      </p>
    </div>
  )
}

const getCachedData = unstable_cache(
  async () => ({
    timestamp: Date.now(),
    iso: new Date().toISOString(),
    rand: Math.random(),
  }),
  ['unstable-cache-demo'],
  { tags: ['unstable-ts'], revalidate: 60 },
)

export default async function CacheDemoPage() {
  const serverUrl = getServerSideURL()
  const renderTime = new Date().toISOString()

  // Section A: fetch() with cache tags
  const fetchTagData = await fetchTimestamp(`${serverUrl}/api/timestamp?s=fetch-tag`, {
    next: { tags: ['fetch-ts'], revalidate: 30 },
  })

  // Section B: unstable_cache with tags
  const unstableData = await getCachedData()

  // Section C: fetch() with time-based revalidation only
  const timeBasedData = await fetchTimestamp(`${serverUrl}/api/timestamp?s=time-based`, {
    next: { revalidate: 15 },
  })

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-8 text-white">
      <div>
        <h1 className="text-3xl font-bold">Cache Demo</h1>
        <p className="text-gray-400">
          Testing Next.js caching mechanisms on Cloudflare Workers.
        </p>
        <p className="mt-2 font-mono text-sm">
          <span className="text-gray-400">Page rendered at:</span>{' '}
          <span className="text-white">{renderTime}</span>
        </p>
      </div>

      {/* Section A: fetch with tags */}
      <div className="rounded-lg border border-green-500 bg-green-950 p-6">
        <h2 className="mb-1 text-lg font-bold text-green-400">
          A. fetch() with cache tags
        </h2>
        <p className="mb-3 text-sm text-green-300">
          <code className="rounded bg-green-900 px-1">
            next: {'{'} tags: [&apos;fetch-ts&apos;], revalidate: 30 {'}'}
          </code>
        </p>
        <TimestampDisplay data={fetchTagData} label="fetch-tag" />
      </div>

      {/* Section B: unstable_cache */}
      <div className="rounded-lg border border-blue-500 bg-blue-950 p-6">
        <h2 className="mb-1 text-lg font-bold text-blue-400">
          B. unstable_cache() with tags
        </h2>
        <p className="mb-3 text-sm text-blue-300">
          <code className="rounded bg-blue-900 px-1">
            tags: [&apos;unstable-ts&apos;], revalidate: 60
          </code>
        </p>
        <TimestampDisplay
          data={unstableData}
          label="unstable-cache"
        />
      </div>

      {/* Section C: time-based only */}
      <div className="rounded-lg border border-purple-500 bg-purple-950 p-6">
        <h2 className="mb-1 text-lg font-bold text-purple-400">
          C. fetch() time-based only
        </h2>
        <p className="mb-3 text-sm text-purple-300">
          <code className="rounded bg-purple-900 px-1">
            next: {'{'} revalidate: 15 {'}'} (no tags)
          </code>
          {' '}&mdash; auto-refreshes every ~15s
        </p>
        <TimestampDisplay data={timeBasedData} label="time-based" />
      </div>

      {/* Revalidation controls */}
      <RevalidateButtons />

      {/* Notes */}
      <div className="rounded-lg border border-dashed border-gray-500 bg-gray-900 p-6">
        <h2 className="mb-2 text-lg font-bold text-gray-300">Cloudflare Workers Notes</h2>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-400">
          <li>
            Without <code className="rounded bg-gray-800 px-1">NEXT_INC_CACHE_R2_BUCKET</code>{' '}
            binding, ISR/fetch cache is in-memory only and lost on worker cold starts.
          </li>
          <li>
            If sections show errors, self-fetch may not work on Workers. Check that{' '}
            <code className="rounded bg-gray-800 px-1">NEXT_PUBLIC_SERVER_URL</code> is set correctly.
          </li>
          <li>
            <strong>How to test:</strong> Refresh the page — &quot;Page rendered at&quot; changes
            but cached timestamps should stay the same. Use buttons to invalidate specific tags.
          </li>
          <li>
            Section C has no revalidation button — it relies purely on the 15s TTL.
          </li>
        </ul>
      </div>
    </div>
  )
}
