import type { Field } from 'payload'

export const variationField = (name: string, label: string): Field => ({
  name,
  type: 'group',
  label,
  custom: { overridable: true },
  fields: [
    {
      name: 'mode',
      type: 'select',
      defaultValue: 'fixed',
      options: [
        { label: 'Fixed Text', value: 'fixed' },
        { label: 'Variation Set', value: 'variation' },
      ],
    },
    {
      name: 'fixedText',
      type: 'textarea',
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData?.mode === 'fixed',
        components: {
          Description: '/components/TemplateVariableReference#TemplateVariableReference',
        },
      },
    },
    {
      name: 'variationSet',
      type: 'relationship',
      relationTo: 'content-variations',
      admin: { condition: (_, siblingData) => siblingData?.mode === 'variation' },
    },
  ],
})
