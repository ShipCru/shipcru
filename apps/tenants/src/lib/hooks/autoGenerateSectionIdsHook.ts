import type { GlobalBeforeChangeHook } from 'payload'

import { generateSectionIds } from '@/lib/resume-pages/autoGenerateSectionIds'

const TAB_NAMES = ['jobTitle', 'industry', 'keyword'] as const

/**
 * beforeChange hook for template globals.
 * Auto-generates sectionId for any section block that does not already have one.
 * Handles both flat structure (legacy) and tabbed structure (DefaultTemplates).
 */
export const autoGenerateSectionIdsHook: GlobalBeforeChangeHook = ({ data }) => {
  // Tabbed structure: iterate over each tab
  for (const tab of TAB_NAMES) {
    if (data[tab]?.sections && Array.isArray(data[tab].sections)) {
      data[tab].sections = generateSectionIds(data[tab].sections)
    }
  }

  // Flat structure fallback (backwards compat during migration)
  if (data.sections && Array.isArray(data.sections)) {
    data.sections = generateSectionIds(data.sections)
  }

  return data
}
