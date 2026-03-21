import { type CollectionConfig, slugField } from 'payload'

import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { superAdminCrud } from '@/access/superAdminCrud'
import { originFields } from '@/fields/origin'
import { seo } from '@/lib/fields/seo'
import { generatePreviewPath } from '@/utils/generatePreviewPath'

export const Industries: CollectionConfig = {
  slug: 'industries',
  access: { ...superAdminCrud, read: authenticatedOrPublished },
  admin: {
    useAsTitle: 'name',
    listSearchableFields: ['name', 'slug'],
    group: 'Resume Pages',
    defaultColumns: ['name', 'slug', '_status', 'category'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'industries',
          path: `/resumes/${data?.slug}`,
          tenantSlug: process.env.DEFAULT_TENANT_SLUG,
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'industries',
        path: `/resumes/${data?.slug}`,
        tenantSlug: process.env.DEFAULT_TENANT_SLUG,
        req,
      }),
  },
  versions: { drafts: true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'industry-categories',
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'jobTitles',
              type: 'join',
              collection: 'job-titles',
              on: 'industries',
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
    slugField({
      useAsSlug: 'name',
    }),
    originFields(),
  ],
}
