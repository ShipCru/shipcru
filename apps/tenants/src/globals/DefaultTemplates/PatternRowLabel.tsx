'use client'

import { useRowLabel } from '@payloadcms/ui'

export default function PatternRowLabel() {
  const { data } = useRowLabel<{ pattern?: string }>()

  return <span>{data?.pattern || 'New Pattern'}</span>
}
