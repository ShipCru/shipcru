import type { Block } from 'payload'

export const HeroSplitImage: Block = {
  slug: 'heroSplitImage',
  interfaceName: 'HeroSplitImageBlock',
  labels: { singular: 'Hero Split Image', plural: 'Hero Split Images' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'People who care about your growth',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.',
    },
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
