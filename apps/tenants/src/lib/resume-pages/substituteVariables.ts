import type { SubstitutionContext } from './types'

import seedrandom from 'seedrandom'

import { applyModifiers, parseVariableExpression, resolveDotPath } from './modifiers'

/**
 * Deterministically selects `count` skills from a list using a seeded RNG.
 */
export function selectSkills(skills: string[], seed: string, count: number = 2): string[] {
  if (skills.length <= count) return [...skills]
  const rng = seedrandom(seed)
  const shuffled = [...skills]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count)
}

function capitalize(str: string): string {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

/**
 * Kept for backward compatibility. The word form lookups from the DB
 * are the canonical source now, but this is still used as a fallback
 * when verbForms is not available.
 */
export const BUILDER_TO_VERB: Record<string, string> = {
  creator: 'create',
  builder: 'build',
  maker: 'make',
  generator: 'generate',
  help: 'get help with',
}

/**
 * Builds the variable map from context.
 * Keys are the bare variable names used inside both $() and {{}}.
 * Exported so the admin variable reference can derive available keys dynamically.
 */
export function buildVariableMap(ctx: SubstitutionContext, selectedSkills: string[]): Record<string, string> {
  const verb =
    ctx.verbForms.singular || (ctx.builder ? BUILDER_TO_VERB[ctx.builder] || ctx.builder : '')

  return {
    // --- Backward-compatible aliases ---
    adjective: ctx.adjective || '',
    'adjective.capitalized': capitalize(ctx.adjective || ''),
    builderWords: ctx.builder || '',
    'builderWords.capitalized': capitalize(ctx.builder || ''),
    contentWords: ctx.content || '',
    'contentWords.capitalized': capitalize(ctx.content || ''),
    verbWords: verb,
    'verbWords.capitalized': capitalize(verb),

    // --- brand.* ---
    'brand.title': ctx.brandTitle || '',

    // --- resumeWords.* ---
    'resumeWords.singular': ctx.resumeWords.singular,
    'resumeWords.plural': ctx.resumeWords.plural,
    'resumeWords.capitalized': ctx.resumeWords.capitalized,
    'resumeWords.abbreviated': ctx.resumeWords.abbreviated,
    'resumeWords.abbreviatedCapitalized': ctx.resumeWords.abbreviatedCapitalized,
    'resumeWords.pluralCapitalized': ctx.resumeWords.pluralCapitalized,
    'resumeWords.pluralAbbreviated': ctx.resumeWords.pluralAbbreviated,
    'resumeWords.pluralAbbreviatedCapitalized': ctx.resumeWords.pluralAbbreviatedCapitalized,

    // --- verbWords.* (expanded) ---
    'verbWords.singular': verb,
    'verbWords.worder': ctx.verbForms.worder,
    'verbWords.worderCapitalized': ctx.verbForms.worderCapitalized,
    'verbWords.wording': ctx.verbForms.wording,
    'verbWords.wordingCapitalized': ctx.verbForms.wordingCapitalized,
    'verbWords.past': ctx.verbForms.past,
    'verbWords.pastCapitalized': ctx.verbForms.pastCapitalized,

    // --- adjectiveWords.* ---
    'adjectiveWords.singular': ctx.adjective || '',
    'adjectiveWords.capitalized': capitalize(ctx.adjective || ''),
    'adjectiveWords.adverb': ctx.adjectiveForms.adverb,
    'adjectiveWords.adverbCapitalized': ctx.adjectiveForms.adverbCapitalized,

    // --- contentWords.* (expanded) ---
    'contentWords.singular': ctx.contentWordForms.singular,
    'contentWords.plural': ctx.contentWordForms.plural,
    'contentWords.pluralCapitalized': ctx.contentWordForms.pluralCapitalized,

    // --- pageTerms.* ---
    'pageTerms.pageTerm': ctx.pageTerms.pageTerm,
    'pageTerms.iSlug': ctx.pageTerms.iSlug,
    'pageTerms.jSlug': ctx.pageTerms.jSlug,

    // --- entity data ---
    skill1: selectedSkills[0] || '',
    skill2: selectedSkills[1] || '',
    industryName: ctx.industryName || '',
    jobTitleName: ctx.jobTitleName || '',
  }
}

/**
 * Resolves a variable expression against the variable map and pageData.
 */
function resolveExpression(
  expr: string,
  vars: Record<string, string>,
  pageData: Record<string, unknown>,
): string {
  const { variable, modifiers } = parseVariableExpression(expr)

  let value: string
  if (variable in vars) {
    value = vars[variable]
  } else if (variable.startsWith('pageData.')) {
    value = resolveDotPath(pageData, variable.slice('pageData.'.length))
  } else {
    value = ''
  }

  return modifiers.length > 0 ? applyModifiers(value, modifiers) : value
}

/**
 * Replaces template variables in text with actual values from the context.
 *
 * Supports two syntaxes — both resolve the same variable map:
 * - $(variableName) and $(variableName:modifier)
 * - {{variableName}} and {{variableName:modifier}}
 *
 * Empty/missing values resolve to empty string. Double spaces are collapsed
 * and leading/trailing whitespace is trimmed.
 */
export function substituteVariables(text: string, ctx: SubstitutionContext): string {
  const selectedSkills = selectSkills(ctx.skills, ctx.skillSeed)
  const vars = buildVariableMap(ctx, selectedSkills)

  const result = text
    .replace(/\$\(([^)]+)\)/g, (_match, expr: string) => resolveExpression(expr, vars, ctx.pageData))
    .replace(/\{\{([^}]+)\}\}/g, (_match, expr: string) => resolveExpression(expr, vars, ctx.pageData))

  return result.replace(/\s{2,}/g, ' ').trim()
}
