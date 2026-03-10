import type { Field, GlobalConfig } from 'payload'

import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import { createGlobalRevalidationHook } from '@/lib/resume-pages/hooks/revalidateResumeData'

function weightedWordFormSetFields(wordFormSetType: string): Field[] {
  return [
    {
      name: 'wordFormSet',
      type: 'relationship',
      relationTo: 'word-form-sets',
      required: true,
      filterOptions: { type: { equals: wordFormSetType } },
    },
    {
      name: 'weight',
      type: 'number',
      defaultValue: 1,
      min: 1,
    },
  ]
}

export const SuffixVariations: GlobalConfig = {
  slug: 'suffix-variations',
  label: 'Suffix Variations',
  admin: { group: 'Templates' },
  access: {
    read: () => true,
    update: isSuperAdminAccess,
  },
  hooks: {
    afterChange: [createGlobalRevalidationHook('suffix-variations')],
  },
  fields: [
    {
      name: 'adjectives',
      type: 'array',
      labels: { singular: 'Adjective', plural: 'Adjectives' },
      fields: weightedWordFormSetFields('adjective'),
      admin: {
        description:
          'Adjective words used in suffix generation. Pattern: {adjective}-resume-{builder}-{content}',
      },
    },
    {
      name: 'builders',
      type: 'array',
      labels: { singular: 'Builder', plural: 'Builders' },
      fields: weightedWordFormSetFields('verb'),
      admin: {
        description: 'Builder words used in suffix generation.',
      },
    },
    {
      name: 'contentWords',
      type: 'array',
      labels: { singular: 'Content Word', plural: 'Content Words' },
      fields: weightedWordFormSetFields('contentWord'),
      admin: {
        description: 'Content words used in suffix generation.',
      },
    },
    {
      name: 'defaultSuffixCount',
      type: 'number',
      defaultValue: 3,
      admin: {
        description: 'Default number of suffix URLs to generate per page.',
      },
    },
  ],
}
