import type { Block } from 'payload'

import { variationField } from '@/lib/fields/variationField'

export const HeroSplitImage: Block = {
  slug: 'heroSplit',
  interfaceName: 'HeroSplitBlock',
  labels: { singular: 'Hero Split Image', plural: 'Hero Split Images' },
  fields: [
    variationField('heading', 'Heading'),
    variationField('description', 'Description'),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'formPlaceholder',
      type: 'text',
      defaultValue: 'Enter your email',
    },
    {
      name: 'formButtonLabel',
      type: 'text',
      defaultValue: 'Get started',
      custom: { overridable: true },
    },
    {
      name: 'formHelperText',
      type: 'text',
      defaultValue: 'We care about your data in our privacy policy.',
    },
    {
      name: 'reviewText',
      type: 'text',
      defaultValue: 'from 200+ reviews',
    },
    {
      name: 'reviewRating',
      type: 'text',
      defaultValue: '5.0',
    },
    {
      name: 'avatars',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
