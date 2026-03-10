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
      name: 'form',
      type: 'group',
      fields: [
        {
          name: 'placeholder',
          type: 'text',
          localized: true,
          defaultValue: 'Enter your email',
        },
        {
          name: 'buttonLabel',
          type: 'text',
          localized: true,
          defaultValue: 'Get started',
          custom: { overridable: true },
        },
        {
          name: 'helperText',
          type: 'text',
          localized: true,
          defaultValue: 'We care about your data in our privacy policy.',
        },
      ],
    },
    {
      name: 'review',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          localized: true,
          defaultValue: 'from 200+ reviews',
        },
        {
          name: 'rating',
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
    },
  ],
}
