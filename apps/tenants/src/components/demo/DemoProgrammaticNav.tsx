'use client'
import { useRouter } from 'next/navigation'

export function DemoProgrammaticNav({ targetPath, label }: { targetPath: string; label: string }) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(targetPath)}
      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
    >
      {label}
    </button>
  )
}
