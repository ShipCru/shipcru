import type { GlobalConfig } from 'payload'

import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import { heroField, sectionsField } from '@/lib/fields/templateFields'
import { autoGenerateSectionIdsHook } from '@/lib/hooks/autoGenerateSectionIdsHook'
import { validateTemplatePattern } from '@/lib/keyword-landings/templatePatterns'
import { createGlobalRevalidationHook } from '@/lib/resume-pages/hooks/revalidateResumeData'

export const DefaultTemplates: GlobalConfig = {
  slug: 'default-templates',
  dbName: 'default_templates',
  admin: {
    group: 'Templates',
  },
  access: {
    read: () => true,
    update: isSuperAdminAccess,
  },
  hooks: {
    beforeChange: [autoGenerateSectionIdsHook],
    afterChange: [createGlobalRevalidationHook('default-templates')],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'jobTitle',
          label: 'Job Title',
          fields: [heroField(), sectionsField()],
        },
        {
          name: 'industry',
          label: 'Industry',
          fields: [heroField(), sectionsField()],
        },
        {
          name: 'keyword',
          label: 'Keyword Landing',
          fields: [
            {
              name: 'patterns',
              type: 'array',
              labels: { singular: 'URL Pattern', plural: 'URL Patterns' },
              defaultValue: [
                { pattern: '$(resume)-$(verber)' },
                { pattern: '$(resume)-$(contentWord)' },
                { pattern: '$(adjective)-$(resume)-$(verber)' },
                { pattern: '$(adjective)-$(resume)-$(contentWord)' },
                { pattern: '$(adjective)-$(resume)-$(verber)-$(contentWord)' },
              ],
              fields: [
                {
                  name: 'pattern',
                  type: 'text',
                  required: true,
                  validate: (value: string | null | undefined) => {
                    if (!value) return 'Pattern is required'
                    const result = validateTemplatePattern(value)
                    if (result.valid === false) return result.error
                    return true
                  },
                  admin: {
                    placeholder: 'e.g., how-to-$(verb)-a-$(resume)',
                    description:
                      'URL template. Variables: $(resume), $(verb), $(verber), $(adjective), $(contentWord). Literals like "how-to-" are kept as-is.',
                  },
                },
              ],
              admin: {
                description:
                  'Define URL patterns for keyword landing pages. Each pattern generates a set of pages from word pool combinations.',
              },
            },
            heroField(),
            sectionsField(),
          ],
        },
      ],
    },
  ],
  versions: {
    max: 50,
    drafts: true,
  },
}
