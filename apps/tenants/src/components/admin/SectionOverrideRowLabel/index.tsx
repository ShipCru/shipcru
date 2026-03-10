'use client'

import { useRowLabel } from '@payloadcms/ui'

function capitalize(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const SectionOverrideRowLabel: React.FC = () => {
  const { rowNumber, data } = useRowLabel<Record<string, unknown>>()

  const blockType = typeof data?.sectionBlockType === 'string' ? data.sectionBlockType : null
  const action = typeof data?.action === 'string' ? data.action : null

  if (blockType) {
    const label = capitalize(blockType)

    if (action === 'hide') return `${label} (hide)`

    const overrideGroup = data?.[`ovrds_${blockType}`] as Record<string, unknown> | undefined
    const fields = overrideGroup?.fieldsToOverride as string[] | undefined

    if (fields?.length) {
      return `${label} → ${fields.map(capitalize).join(', ')}`
    }

    return label
  }

  const row = rowNumber !== undefined ? rowNumber + 1 : ''
  return `Section Override ${row}`
}
