import type { SubstitutionContext } from './types'

import seedrandom from 'seedrandom'

/**
 * Maps builder suffix words to their verb forms.
 * Used for $(verbWords) substitution.
 */
export const BUILDER_TO_VERB: Record<string, string> = {
  creator: 'create',
  builder: 'build',
  maker: 'make',
  generator: 'generate',
  help: 'get help with',
}

/**
 * Deterministically selects `count` skills from a list using a seeded RNG.
 * Fisher-Yates shuffle with seedrandom ensures the same seed always produces
 * the same selection, so pages render consistently across requests.
 *
 * @param skills - Full list of skill names
 * @param seed - Seed string (typically the contentSeed from the parsed URL)
 * @param count - How many skills to select (default 2)
 * @returns Selected skills (up to `count`, or fewer if not enough available)
 */
export function selectSkills(skills: string[], seed: string, count: number = 2): string[] {
  if (skills.length <= count) return [...skills]

  const rng = seedrandom(seed)
  const shuffled = [...skills]

  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled.slice(0, count)
}

/**
 * Capitalizes the first letter of a string.
 */
function capitalize(str: string): string {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

/**
 * Replaces template variables in text with actual values from the context.
 *
 * Supported variables:
 * - $(adjective), $(adjective.capitalized) -- from URL suffix
 * - $(builderWords), $(builderWords.capitalized) -- from URL suffix
 * - $(contentWords), $(contentWords.capitalized) -- from URL suffix
 * - $(verbWords), $(verbWords.capitalized) -- derived from builder via BUILDER_TO_VERB
 * - $(resumeWords.singular), $(resumeWords.plural) -- static "resume"/"resumes"
 * - {skill1}, {skill2} -- deterministically selected from skills list
 * - {industryName}, {jobTitleName} -- entity names
 *
 * Empty/missing values resolve to empty string. Double spaces are collapsed
 * and leading/trailing whitespace is trimmed.
 *
 * @param text - Template text containing variable placeholders
 * @param ctx - Context providing values for substitution
 * @returns Text with all variables replaced
 */
export function substituteVariables(text: string, ctx: SubstitutionContext): string {
  const verb = ctx.builder ? (BUILDER_TO_VERB[ctx.builder] || ctx.builder) : ''
  const selectedSkills = selectSkills(ctx.skills, ctx.skillSeed)

  const replacements: Record<string, string> = {
    '$(adjective)': ctx.adjective || '',
    '$(adjective.capitalized)': capitalize(ctx.adjective || ''),
    '$(builderWords)': ctx.builder || '',
    '$(builderWords.capitalized)': capitalize(ctx.builder || ''),
    '$(contentWords)': ctx.content || '',
    '$(contentWords.capitalized)': capitalize(ctx.content || ''),
    '$(verbWords)': verb,
    '$(verbWords.capitalized)': capitalize(verb),
    '$(resumeWords.singular)': 'resume',
    '$(resumeWords.plural)': 'resumes',
    '{skill1}': selectedSkills[0] || '',
    '{skill2}': selectedSkills[1] || '',
    '{industryName}': ctx.industryName || '',
    '{jobTitleName}': ctx.jobTitleName || '',
  }

  let result = text
  for (const [variable, value] of Object.entries(replacements)) {
    result = result.replaceAll(variable, value)
  }

  // Clean up artifacts from empty replacements
  return result.replace(/\s{2,}/g, ' ').trim()
}
