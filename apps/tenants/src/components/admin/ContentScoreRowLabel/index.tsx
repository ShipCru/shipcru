'use client'

import { useRowLabel } from '@payloadcms/ui'

const ContentScoreRowLabel: React.FC = () => {
  const { data } = useRowLabel<{
    content?: { name?: string } | string | number
    experienceScore?: number
    interestScore?: number
  }>()

  const name =
    typeof data?.content === 'object' && data.content !== null
      ? (data.content as { name?: string }).name || 'Untitled'
      : 'Untitled'

  const exp = data?.experienceScore?.toFixed(1) ?? '0.0'
  const int = data?.interestScore?.toFixed(1) ?? '0.0'

  return (
    <span>
      {name} (exp: {exp}, int: {int})
    </span>
  )
}

export default ContentScoreRowLabel
