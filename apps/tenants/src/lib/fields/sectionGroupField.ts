import type { Field } from 'payload'

export const sectionIdField: Field = {
  name: 'sectionId',
  type: 'text',
  admin: {
    position: 'sidebar',
    description:
      'Auto-generated identifier for this section. Used as merge key for template overrides.',
  },
}

export const sectionGroupField: Field = {
  name: 'sectionGroup',
  type: 'select',
  defaultValue: 'test',
  options: [
    { label: 'Before (fixed, top)', value: 'before' },
    { label: 'Test (randomized middle)', value: 'test' },
    { label: 'After (fixed, bottom)', value: 'after' },
  ],
  admin: {
    position: 'sidebar',
    description:
      'Controls section ordering group. "Test" sections are shuffled for A/B testing.',
  },
}
