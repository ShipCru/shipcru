import type { Block } from 'payload'

export const Metrics: Block = {
  slug: 'metrics',
  interfaceName: 'MetricsBlock',
  labels: { singular: 'Metrics', plural: 'Metrics' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Build something great',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Everything you need to build modern UI and great products.',
    },
    {
      name: 'metrics',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Metric', plural: 'Metrics' },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'ctaLabel',
          type: 'text',
        },
        {
          name: 'ctaLink',
          type: 'text',
        },
      ],
    },
  ],
}
