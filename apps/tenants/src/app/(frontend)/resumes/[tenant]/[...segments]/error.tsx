'use client'

export default function ResumePageError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <h2 className="mb-4 text-xl font-semibold">Something went wrong</h2>
      <p className="mb-6 text-gray-600">
        We encountered an error loading this page. Please try again.
      </p>
      <button
        onClick={reset}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  )
}
