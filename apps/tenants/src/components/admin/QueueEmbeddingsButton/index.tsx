'use client'

import type { QueueMissingEmbeddingsResult } from '@/plugins/semanticSearch/endpoints/queueMissingEmbeddings'
import type React from 'react'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Button, toast } from '@payloadcms/ui'

export const QueueEmbeddingsButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleClick = useCallback(async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/search/queue-missing-embeddings', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = (await response.json()) as
        | QueueMissingEmbeddingsResult
        | { errors: { message: string }[] }

      if (!response.ok) {
        const errData = data as { errors: { message: string }[] }
        toast.error(errData.errors?.[0]?.message ?? 'Request failed')
        return
      }

      const result = data as QueueMissingEmbeddingsResult

      if (result.queued > 0) {
        toast.success(`Queued ${result.queued} embedding job${result.queued === 1 ? '' : 's'}`)
        router.refresh()
      } else {
        toast.info('No missing embeddings found')
      }
    } catch {
      toast.error('Request failed')
    } finally {
      setLoading(false)
    }
  }, [router])

  return (
    <Button buttonStyle="primary" disabled={loading} onClick={handleClick} size="small">
      {loading ? 'Queuing...' : 'Queue missing embeddings'}
    </Button>
  )
}
