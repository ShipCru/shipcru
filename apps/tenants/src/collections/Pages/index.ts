import type { CollectionConfig } from 'payload'

import { createBreadcrumbsField, createParentField } from '@payloadcms/plugin-nested-docs'

import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { canModify } from '@/access/canModify'
import { deletePageAccess } from './access/deletePage'
import { populatePublishedAt } from './hooks/populatePublishedAt'
import { setAuthor } from './hooks/setAuthor'
import { revalidatePage, revalidateDelete } from './hooks/revalidatePage'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: canModify,
    read: authenticatedOrPublished,
    update: canModify,
    delete: deletePageAccess,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt', '_status'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      localized: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    createParentField('pages', {
      admin: {
        position: 'sidebar',
      },
    }),
    createBreadcrumbsField('pages', {
      admin: {
        position: 'sidebar',
      },
    }),
  ],
  hooks: {
    beforeChange: [setAuthor, populatePublishedAt],
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
  },
  versions: {
    maxPerDoc: 50,
    drafts: {
      schedulePublish: true,
      validate: false,
    },
  },
}
