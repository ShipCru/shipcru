import { type CollectionConfig, slugField } from 'payload'

import { superAdminCrud } from '@/access/superAdminCrud'
import { originFields } from '@/fields/origin'

export const RESUME_CONTENT_TYPES = [
  { label: 'Skill', value: 'skill' },
  { label: 'Experience', value: 'experience' },
  { label: 'Summary', value: 'summary' },
  { label: 'Accomplishment', value: 'accomplishment' },
  { label: 'Affiliation', value: 'affiliation' },
  { label: 'Certification', value: 'certification' },
] as const

export const ResumeContent: CollectionConfig = {
  slug: 'resume-content',
  access: superAdminCrud,
  admin: {
    useAsTitle: 'name',
    group: 'Resume Pages',
    defaultColumns: ['name', 'type', 'slug'],
    listSearchableFields: ['name', 'slug'],
    components: {
      beforeList: ['/components/admin/TypeFilterTabs'],
    },
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [...RESUME_CONTENT_TYPES],
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    slugField({ useAsSlug: 'name' }),
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description:
          'The content text (experience bullet, summary paragraph, skill phrase, etc.)',
      },
    },
    originFields(),
  ],
}
