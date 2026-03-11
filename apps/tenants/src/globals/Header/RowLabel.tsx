'use client'

import { useRowLabel } from '@payloadcms/ui'

export default function HeaderNavItemRowLabel() {
  const { data } = useRowLabel<{
    type?: 'link' | 'dropdown'
    link?: { label?: string }
    label?: string
  }>()

  const label =
    data?.type === 'dropdown' ? data?.label : data?.link?.label

  return <span>{label || 'Untitled'}</span>
}
