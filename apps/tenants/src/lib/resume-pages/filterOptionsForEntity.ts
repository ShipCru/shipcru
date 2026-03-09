import type { VariationOption } from './types'

/**
 * Filters variation options based on whether the entity has skills.
 *
 * Options containing `{skill1}` or `{skill2}` template variables produce
 * broken text when the entity (e.g., an industry page) has no skills.
 * This function removes those options, with a fallback strategy if ALL
 * options require skills.
 *
 * @param options - The full set of variation options
 * @param hasSkills - Whether the entity has associated skills
 * @returns Filtered options safe to render for this entity
 */
export function filterOptionsForEntity(
  options: VariationOption[],
  hasSkills: boolean,
): VariationOption[] {
  if (hasSkills) return options

  const filtered = options.filter(
    (opt) => !opt.text.includes('{skill1}') && !opt.text.includes('{skill2}'),
  )

  if (filtered.length > 0) return filtered

  // ALL options contain skill refs -- strip skills from first option as fallback
  return [
    {
      text: options[0].text
        .replace(/\{skill1\}/g, '')
        .replace(/\{skill2\}/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim(),
      weight: 1,
    },
  ]
}
