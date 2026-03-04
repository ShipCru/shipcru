import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our reviews',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Hear first-hand from our incredible community of customers.',
    },
    {
      name: 'reviews',
      type: 'array',
      required: true,
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
          required: true,
        },
        {
          name: 'authorName',
          type: 'text',
          required: true,
        },
        {
          name: 'authorTitle',
          type: 'text',
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
  ],
}
