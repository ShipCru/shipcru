import type { Block } from 'payload'

import { linkGroup } from '@/lib/fields/linkGroup'
import { sectionGroupField, sectionIdField } from '@/lib/fields/sectionGroupField'
import { variationField } from '@/lib/fields/variationField'

export const CTA: Block = {
  slug: 'cta',
  interfaceName: 'CTABlock',
  labels: { singular: 'CTA', plural: 'CTAs' },
  fields: [
    variationField('heading', 'Heading'),
    variationField('description', 'Description'),
    linkGroup({
      overrides: {
        maxRows: 3,
        admin: {
          description: 'CTA buttons displayed below the description',
        },
      },
    }),
    sectionIdField,
    sectionGroupField,
  ],
}
