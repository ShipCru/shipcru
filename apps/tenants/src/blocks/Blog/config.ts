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
      defaultValue: 'Blog',
    },
    variationField('heading', 'Heading'),
    variationField('description', 'Description'),
    {
      name: 'formPlaceholder',
      type: 'text',
      defaultValue: 'Enter your email',
    },
    {
      name: 'formButtonLabel',
      type: 'text',
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
        },
        {
          name: 'summary',
          type: 'textarea',
        },
        {
          name: 'href',
          type: 'text',
        },
        {
          name: 'categoryName',
          type: 'text',
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
        },
        {
          name: 'authorName',
          type: 'text',
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
