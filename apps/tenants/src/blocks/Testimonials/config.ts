import type { Block } from 'payload'

import { sectionGroupField, sectionIdField } from '@/lib/fields/sectionGroupField'
import { variationField } from '@/lib/fields/variationField'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    variationField('heading', 'Heading'),
    variationField('description', 'Description'),
    {
      name: 'reviews',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      labels: {
        singular: 'Review',
        plural: 'Reviews',
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'authorName',
          type: 'text',
          localized: true,
        },
        {
          name: 'authorTitle',
          type: 'text',
          localized: true,
          admin: {
            placeholder: 'e.g., Project Manager, Warpspeed',
          },
        },
        {
          name: 'authorImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'companyName',
          type: 'text',
        },
        {
          name: 'companyLogo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Light mode logo',
          },
        },
        {
          name: 'companyLogoDark',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Dark mode logo',
          },
        },
      ],
    },
    sectionIdField,
    sectionGroupField,
  ],
}
