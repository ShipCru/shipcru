import type { GlobalBeforeChangeHook } from 'payload'

import { generateSectionIds } from '@/lib/resume-pages/autoGenerateSectionIds'

/**
 * beforeChange hook for template globals.
 * Auto-generates sectionId for any section block in the "sections" blocks field
 * that does not already have one.
 */
export const autoGenerateSectionIdsHook: GlobalBeforeChangeHook = ({ data }) => {
  if (data.sections && Array.isArray(data.sections)) {
    data.sections = generateSectionIds(data.sections)
  }
  return data
}
