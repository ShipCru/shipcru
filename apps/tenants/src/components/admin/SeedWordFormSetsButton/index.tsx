'use client'

import type { SeedWordFormSetsResult } from '@/collections/WordFormSets/endpoints/seedWordFormSets'
import type React from 'react'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Button, toast } from '@payloadcms/ui'

export const SeedWordFormSetsButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleClick = useCallback(async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/word-form-sets/seed', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = (await response.json()) as
        | SeedWordFormSetsResult
        | { errors: { message: string }[] }

      if (!response.ok) {
        const errData = data as { errors: { message: string }[] }
        toast.error(errData.errors?.[0]?.message ?? 'Seed failed')
        return
      }

      const result = data as SeedWordFormSetsResult
      if (result.created > 0) {
        toast.success(`Seeded ${result.created} word form sets`)
        router.refresh()
      } else {
        toast.info(`Table already has ${result.skipped} entries — nothing to seed`)
      }
    } catch {
      toast.error('Request failed')
    } finally {
      setLoading(false)
    }
  }, [router])

  return (
    <Button buttonStyle="primary" disabled={loading} onClick={handleClick} size="small">
      {loading ? 'Seeding...' : 'Seed defaults'}
    </Button>
  )
}
