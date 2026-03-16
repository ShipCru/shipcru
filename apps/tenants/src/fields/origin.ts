import type { GroupField } from 'payload'

export const originFields = (): GroupField => ({
  name: 'origin',
  type: 'group',
  admin: {
    position: 'sidebar',
    description: 'Where this data originated',
  },
  fields: [
    {
      name: 'source',
      type: 'relationship',
      relationTo: 'sources',
    },
    {
      name: 'importedAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'notes',
      type: 'text',
      admin: {
        description: 'Optional: batch ID, file name, external ID, etc.',
      },
    },
  ],
})
