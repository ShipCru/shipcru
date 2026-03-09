/**
 * A section block with at minimum a blockType. Other fields are optional.
 * Matches the shape of blocks as they come from Payload's blocks field.
 */
interface SectionBlock {
  blockType: string
  sectionId?: string
  [key: string]: unknown
}

/**
 * Auto-generates sectionId values for sections that don't have one.
 *
 * Rules:
 * - First occurrence of a blockType: sectionId = blockType (e.g., "testimonials")
 * - Subsequent occurrences: sectionId = blockType-N (e.g., "testimonials-2", "testimonials-3")
 * - Existing sectionId values are preserved but still count toward the occurrence count
 * - Generated IDs never collide with manually-set sectionIds
 *
 * This is a pure function -- does not mutate the input array.
 */
export function generateSectionIds<T extends SectionBlock>(sections: T[]): (T & { sectionId: string })[] {
  const reserved = new Set(
    sections.map((s) => s.sectionId).filter((id): id is string => Boolean(id)),
  )
  const counts: Record<string, number> = {}

  return sections.map((section) => {
    counts[section.blockType] = (counts[section.blockType] || 0) + 1

    if (section.sectionId) {
      return section as T & { sectionId: string }
    }

    let count = counts[section.blockType]
    let sectionId = count === 1 ? section.blockType : `${section.blockType}-${count}`

    while (reserved.has(sectionId)) {
      count++
      sectionId = `${section.blockType}-${count}`
    }

    reserved.add(sectionId)
    return { ...section, sectionId }
  })
}
