import type { Block } from 'payload'

import { sectionGroupField, sectionIdField } from '@/lib/fields/sectionGroupField'
import { variationField } from '@/lib/fields/variationField'

export const Metrics: Block = {
  slug: 'metrics',
  interfaceName: 'MetricsBlock',
  labels: { singular: 'Metrics', plural: 'Metrics' },
  fields: [
    variationField('heading', 'Heading'),
    variationField('description', 'Description'),
    {
      name: 'metrics',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Metric', plural: 'Metrics' },
      fields: [
        {
          name: 'value',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
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
    sectionIdField,
    sectionGroupField,
  ],
}
