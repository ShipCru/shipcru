import type { Block } from 'payload'

import { sectionGroupField, sectionIdField } from '@/lib/fields/sectionGroupField'
import { variationField } from '@/lib/fields/variationField'

export const Blog: Block = {
  slug: 'blog',
  interfaceName: 'BlogBlock',
  labels: { singular: 'Blog', plural: 'Blogs' },
  fields: [
    {
      name: 'label',
      type: 'text',
      localized: true,
      defaultValue: 'Blog',
    },
    variationField('heading', 'Heading'),
    variationField('description', 'Description'),
    {
      name: 'formPlaceholder',
      type: 'text',
      localized: true,
      defaultValue: 'Enter your email',
    },
    {
      name: 'formButtonLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Subscribe',
    },
    {
      name: 'articles',
      type: 'array',
      labels: { singular: 'Article', plural: 'Articles' },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'summary',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'href',
          type: 'text',
        },
        {
          name: 'categoryName',
          type: 'text',
          localized: true,
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'publishedAt',
          type: 'text',
        },
        {
          name: 'readingTime',
          type: 'text',
          localized: true,
        },
        {
          name: 'authorName',
          type: 'text',
          localized: true,
        },
        {
          name: 'authorImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    sectionIdField,
    sectionGroupField,
  ],
}
