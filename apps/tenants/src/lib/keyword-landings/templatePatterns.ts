import { WORD_FORM_SET_LOOKUP_FIELD } from '@/collections/WordFormSets/constants'

export const TEMPLATE_VARIABLES = {
  resume: { wordFormSetType: 'resumeWord', slugField: WORD_FORM_SET_LOOKUP_FIELD.resumeWord },
  verb: { wordFormSetType: 'verb', slugField: 'v_singular' },
  verber: { wordFormSetType: 'verb', slugField: WORD_FORM_SET_LOOKUP_FIELD.verb },
  adjective: { wordFormSetType: 'adjective', slugField: WORD_FORM_SET_LOOKUP_FIELD.adjective },
  contentWord: {
    wordFormSetType: 'contentWord',
    slugField: WORD_FORM_SET_LOOKUP_FIELD.contentWord,
  },
} as const

export type TemplateVariableName = keyof typeof TEMPLATE_VARIABLES
export type TemplateWordPools = Record<TemplateVariableName, string[]>

const VARIABLE_PATTERN = /\$\(([^)]+)\)/
const VARIABLE_PATTERN_GLOBAL = new RegExp(VARIABLE_PATTERN.source, 'g')
const KNOWN_VARIABLES = new Set<string>(Object.keys(TEMPLATE_VARIABLES))

export const DEFAULT_KEYWORD_PATTERNS = [
  '$(resume)-$(verber)',
  '$(resume)-$(contentWord)',
  '$(adjective)-$(resume)-$(verber)',
  '$(adjective)-$(resume)-$(contentWord)',
  '$(adjective)-$(resume)-$(verber)-$(contentWord)',
]

export type ValidationResult = { valid: true } | { valid: false; error: string }

export interface CompiledTemplatePattern {
  pattern: string
  regex: RegExp
  variableNames: TemplateVariableName[]
  literalSegments: number
}

export interface TemplateMatchResult {
  variables: Partial<Record<TemplateVariableName, string>>
  template: string
}

export function validateTemplatePattern(pattern: string): ValidationResult {
  if (!pattern) {
    return { valid: false, error: 'Pattern must not be empty' }
  }

  const variables: string[] = []
  let match: RegExpExecArray | null
  const regex = new RegExp(VARIABLE_PATTERN.source, 'g')

  while ((match = regex.exec(pattern)) !== null) {
    variables.push(match[1])
  }

  if (variables.length === 0) {
    return { valid: false, error: 'Pattern must contain at least one variable' }
  }

  const unknown = variables.filter((v) => !KNOWN_VARIABLES.has(v))
  if (unknown.length > 0) {
    return { valid: false, error: `Unknown variables: ${unknown.join(', ')}` }
  }

  const withoutValid = pattern.replace(VARIABLE_PATTERN_GLOBAL, '')
  if (/\$\w/.test(withoutValid)) {
    return { valid: false, error: 'Malformed variable syntax — use $(name) format' }
  }

  return { valid: true }
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function compileTemplatePattern(
  pattern: string,
  pools: TemplateWordPools,
): CompiledTemplatePattern {
  const variableNames: TemplateVariableName[] = []
  let literalSegments = 0

  const regex = new RegExp(VARIABLE_PATTERN.source, 'g')
  let lastIndex = 0
  let regexStr = '^'
  let match: RegExpExecArray | null

  while ((match = regex.exec(pattern)) !== null) {
    const literal = pattern.slice(lastIndex, match.index)
    if (literal) {
      regexStr += escapeRegex(literal)
      literalSegments += literal.length
    }

    const varName = match[1] as TemplateVariableName
    variableNames.push(varName)

    const words = [...pools[varName]].sort((a, b) => b.length - a.length)
    const alternation = words.map(escapeRegex).join('|')
    regexStr += `(${alternation})`

    lastIndex = regex.lastIndex
  }

  const trailing = pattern.slice(lastIndex)
  if (trailing) {
    regexStr += escapeRegex(trailing)
    literalSegments += trailing.length
  }

  regexStr += '$'

  return {
    pattern,
    regex: new RegExp(regexStr),
    variableNames,
    literalSegments,
  }
}

export function matchSlugAgainstTemplate(
  slug: string,
  compiled: CompiledTemplatePattern,
): TemplateMatchResult | null {
  const match = slug.match(compiled.regex)
  if (!match) return null

  const variables: Partial<Record<TemplateVariableName, string>> = {}
  for (let i = 0; i < compiled.variableNames.length; i++) {
    variables[compiled.variableNames[i]] = match[i + 1]
  }

  return {
    variables,
    template: compiled.pattern,
  }
}

export function isValidKeywordSlug(
  slug: string,
  pools: TemplateWordPools,
  patterns: string[] = DEFAULT_KEYWORD_PATTERNS,
): boolean {
  return matchSlugToTemplates(slug, patterns, pools) !== null
}

export function matchSlugToTemplates(
  slug: string,
  patterns: string[],
  wordPools: TemplateWordPools,
): TemplateMatchResult | null {
  if (!slug) return null

  let bestMatch: TemplateMatchResult | null = null
  let bestLiteralSegments = -1

  for (const pattern of patterns) {
    const compiled = compileTemplatePattern(pattern, wordPools)
    const result = matchSlugAgainstTemplate(slug, compiled)

    if (result && compiled.literalSegments > bestLiteralSegments) {
      bestMatch = result
      bestLiteralSegments = compiled.literalSegments
    }
  }

  return bestMatch
}
