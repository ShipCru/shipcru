import type { GlobalConfig } from 'payload'

import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import { link } from '@/lib/fields/link'
import { createGlobalRevalidationHook } from '@/lib/resume-pages/hooks/revalidateResumeData'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: { group: 'Navigation' },
  access: {
    read: () => true,
    update: isSuperAdminAccess,
  },
  hooks: {
    afterChange: [createGlobalRevalidationHook('header')],
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 8,
      labels: { singular: 'Nav Item', plural: 'Nav Items' },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Header/RowLabel',
        },
      },
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'link',
          options: [
            { label: 'Link', value: 'link' },
            { label: 'Dropdown', value: 'dropdown' },
          ],
          admin: { layout: 'horizontal' },
        },
        link({
          overrides: {
            admin: {
              hideGutter: true,
              condition: (_, siblingData) => siblingData?.type === 'link',
            },
          },
        }),
        {
          name: 'label',
          type: 'text',
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
          },
        },
        {
          name: 'dropdownItems',
          type: 'array',
          labels: { singular: 'Dropdown Item', plural: 'Dropdown Items' },
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
            initCollapsed: true,
          },
          fields: [
            link(),
            {
              name: 'subtitle',
              type: 'text',
              localized: true,
            },
          ],
        },
      ],
    },
  ],
}
