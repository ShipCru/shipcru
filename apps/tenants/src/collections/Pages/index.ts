import { type CollectionConfig, slugField } from 'payload'
import { createBreadcrumbsField, createParentField } from '@payloadcms/plugin-nested-docs'

import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { canModify } from '@/access/canModify'
import { HERO_BLOCKS, LAYOUT_BLOCKS } from '@/blocks'
import { seo } from '@/lib/fields/seo'
import { Page } from '@/payload-types'
import { buildUrl } from '@/utils/buildUrl'
import { generatePreviewPath } from '@/utils/generatePreviewPath'
import { deletePageAccess } from './access/deletePage'
import { populatePublishedAt } from './hooks/populatePublishedAt'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { setAuthor } from './hooks/setAuthor'

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
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          path: buildUrl({
            collection: 'pages',
            breadcrumbs: data?.breadcrumbs,
            absolute: false,
          }),
          tenantSlug: process.env.DEFAULT_TENANT_SLUG,
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        path: buildUrl({
          collection: 'pages',
          breadcrumbs: data?.breadcrumbs as Page['breadcrumbs'],
          absolute: false,
        }),
        tenantSlug: process.env.DEFAULT_TENANT_SLUG,
        req,
      }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'blocks',
              maxRows: 1,
              blocks: [...HERO_BLOCKS],
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [...LAYOUT_BLOCKS],
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [...seo()],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField({
      useAsSlug: 'title',
    }),
    {
      name: 'keywordCollisionWarning',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/collections/Pages/components/KeywordCollisionWarning#KeywordCollisionWarning',
        },
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
