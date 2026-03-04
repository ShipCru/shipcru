import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

function Skeleton({ label, delay }: { label: string; delay: string }) {
  return (
    <div className="animate-pulse rounded-lg border border-dashed border-gray-400 bg-gray-800 p-6">
      <p className="text-gray-400">Loading {label} (simulated {delay} delay)...</p>
    </div>
  )
}

async function SlowBlock({ delay, label }: { delay: number; label: string }) {
  await new Promise((r) => setTimeout(r, delay))

  return (
    <div className="rounded-lg border border-green-500 bg-green-950 p-6">
      <p className="font-bold text-green-400">{label}</p>
      <p className="text-sm text-green-300">Resolved after ~{delay}ms delay</p>
    </div>
  )
}

export default function StreamDemoPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-8 text-white">
      <h1 className="text-3xl font-bold">Streaming Demo</h1>
      <p className="text-gray-400">
        Each block below is wrapped in a Suspense boundary. If streaming works, you will see them
        appear one by one as they resolve — not all at once.
      </p>

      {/* Instant */}
      <div className="rounded-lg border border-blue-500 bg-blue-950 p-6">
        <p className="font-bold text-blue-400">Instant Block (no delay)</p>
        <p className="text-sm text-blue-300">This renders immediately with the shell.</p>
      </div>

      {/* 1s delay */}
      <Suspense fallback={<Skeleton label="Block A" delay="1s" />}>
        <SlowBlock delay={1000} label="Block A — 1 second delay" />
      </Suspense>

      {/* 2s delay */}
      <Suspense fallback={<Skeleton label="Block B" delay="2s" />}>
        <SlowBlock delay={2000} label="Block B — 2 second delay" />
      </Suspense>

      {/* 3s delay */}
      <Suspense fallback={<Skeleton label="Block C" delay="3s" />}>
        <SlowBlock delay={3000} label="Block C — 3 second delay" />
      </Suspense>

      <hr className="border-gray-700" />

      <div className="space-y-2 text-sm text-gray-500">
        <p>
          <strong>SSE test:</strong>{' '}
          <code className="rounded bg-gray-800 px-1">
            curl -N http://localhost:3000/api/stream-test
          </code>
        </p>
        <p>
          <strong>What to look for:</strong> Skeleton placeholders should appear first, then get
          replaced by green blocks at 1s, 2s, and 3s intervals.
        </p>
      </div>
    </div>
  )
}
