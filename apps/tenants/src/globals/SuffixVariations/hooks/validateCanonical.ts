import type { GlobalBeforeValidateHook } from 'payload'

import { ValidationError } from 'payload'

const WORD_ARRAYS = ['adjectives', 'builders', 'contentWords'] as const

const LABELS: Record<string, string> = {
  adjectives: 'adjectives',
  builders: 'builders',
  contentWords: 'content words',
}

export const validateCanonical: GlobalBeforeValidateHook = ({ data }) => {
  for (const arrayName of WORD_ARRAYS) {
    const items = data?.[arrayName] as Array<{ isCanonical?: boolean }> | undefined
    const canonicalCount = items?.filter((item) => item.isCanonical).length ?? 0
    if (canonicalCount > 1) {
      throw new ValidationError({
        errors: [
          {
            path: arrayName,
            message: `Only one ${LABELS[arrayName]} entry can be marked as canonical.`,
          },
        ],
      })
    }
  }
  return data
}
