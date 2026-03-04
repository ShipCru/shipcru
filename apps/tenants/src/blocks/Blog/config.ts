import type { Block } from 'payload'

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
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Resource library',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Subscribe to learn about new product features, the latest in technology, solutions, and updates.',
    },
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
          required: true,
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
  ],
}
