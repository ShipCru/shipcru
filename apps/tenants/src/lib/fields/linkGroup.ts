import { type ArrayField, deepMerge, type Field } from 'payload'

import { link } from './link'

type LinkGroupType = (options?: { overrides?: Partial<ArrayField> }) => Field

export const linkGroup: LinkGroupType = ({ overrides = {} } = {}) => {
  const generatedLinkGroup: ArrayField = {
    name: 'links',
    label: 'Action Buttons',
    type: 'array',
    fields: [
      link(),
      {
        name: 'variant',
        type: 'select',
        label: 'Style',
        defaultValue: 'primary',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Tertiary', value: 'tertiary' },
          { label: 'Link (Gray)', value: 'link-gray' },
          { label: 'Link (Color)', value: 'link-color' },
        ],
      },
    ],
    admin: {
      initCollapsed: false,
    },
  }

  return deepMerge(generatedLinkGroup, overrides)
}
