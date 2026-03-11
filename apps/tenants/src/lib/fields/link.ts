import { deepMerge, type Field, type GroupField } from 'payload'

type LinkType = (options?: { overrides?: Partial<GroupField> }) => Field

export const link: LinkType = ({ overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    interfaceName: 'LinkField',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'reference',
            type: 'relationship',
            admin: {
              condition: (_, siblingData) => siblingData?.type === 'reference',
              width: '50%',
            },
            label: 'Document to link to',
            relationTo: ['pages'],
          },
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_, siblingData) => siblingData?.type === 'custom',
              width: '50%',
            },
            label: 'Custom URL',
          },
          {
            name: 'label',
            type: 'text',
            admin: {
              width: '50%',
            },
            label: 'Label',
            localized: true,
          },
        ],
      },
    ],
  }

  return deepMerge(linkResult, overrides)
}
