import { deepMerge, type Field } from 'payload'

import { ICONS } from '@/components/icons'

const iconOptions = [...ICONS]

export const icon = ({ overrides = {} }: { overrides?: Partial<Field> } = {}) => {
  const fields: Field = {
    name: 'icon',
    type: 'select',
    label: 'Icon',
    interfaceName: 'IconField',
    options: iconOptions,
    admin: {
      components: {
        Field: '/components/admin/IconField#IconField',
      },
    },
  }

  return deepMerge(fields, overrides)
}
