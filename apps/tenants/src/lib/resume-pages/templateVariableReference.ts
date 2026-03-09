import type { SubstitutionContext } from './types'

import { buildVariableMap } from './substituteVariables'

export interface VariableReferenceEntry {
  name: string
  example: string
}

export interface VariableReferenceGroup {
  group: string
  variables: VariableReferenceEntry[]
}

/**
 * Sample context used to derive all available variable keys and example values.
 * Adding a new key to buildVariableMap automatically surfaces it here.
 */
const SAMPLE_CTX: SubstitutionContext = {
  adjective: 'best',
  builder: 'creator',
  content: 'templates',
  skills: ['JavaScript', 'React'],
  skillSeed: 'sample',
  industryName: 'Technology',
  jobTitleName: 'Software Engineer',
  brandTitle: 'Rocket Resume',
  resumeWords: {
    singular: 'resume',
    plural: 'resumes',
    capitalized: 'Resume',
    abbreviated: 'resume',
    abbreviatedCapitalized: 'Resume',
    pluralCapitalized: 'Resumes',
    pluralAbbreviated: 'resumes',
    pluralAbbreviatedCapitalized: 'Resumes',
  },
  verbForms: {
    singular: 'create',
    capitalized: 'Create',
    worder: 'creator',
    worderCapitalized: 'Creator',
    wording: 'creating',
    wordingCapitalized: 'Creating',
    past: 'created',
    pastCapitalized: 'Created',
  },
  adjectiveForms: {
    singular: 'best',
    capitalized: 'Best',
    adverb: 'better',
    adverbCapitalized: 'Better',
  },
  contentWordForms: {
    singular: 'template',
    plural: 'templates',
    capitalized: 'Template',
    pluralCapitalized: 'Templates',
  },
  pageTerms: {
    pageTerm: 'Technology Software Engineer',
    iSlug: 'technology',
    jSlug: 'software-engineer',
  },
  pageData: {},
}

const SAMPLE_SKILLS = ['JavaScript', 'React']

/** Group prefixes in display order. */
const GROUP_ORDER = [
  { prefix: 'brand.', group: 'Brand' },
  { prefix: 'resumeWords.', group: 'Resume Words' },
  { prefix: 'verbWords.', group: 'Verb Words' },
  { prefix: 'adjectiveWords.', group: 'Adjective Words' },
  { prefix: 'contentWords.', group: 'Content Words' },
  { prefix: 'pageTerms.', group: 'Page Terms' },
  { prefix: 'adjective', group: 'URL Suffix (shorthand)' },
  { prefix: 'builderWords', group: 'URL Suffix (shorthand)' },
  { prefix: 'verbWords', group: 'URL Suffix (shorthand)', exact: true },
]

function inferGroup(key: string): string {
  for (const { prefix, group, exact } of GROUP_ORDER) {
    if (exact ? key === prefix : key.startsWith(prefix)) return group
  }
  if (['skill1', 'skill2', 'industryName', 'jobTitleName'].includes(key)) return 'Entity Data'
  return 'Other'
}

/**
 * Returns all available template variables grouped by category.
 * Derives keys dynamically from buildVariableMap — adding a key there
 * automatically includes it here.
 */
export function getTemplateVariableReference(): VariableReferenceGroup[] {
  const map = buildVariableMap(SAMPLE_CTX, SAMPLE_SKILLS)

  const grouped = new Map<string, VariableReferenceEntry[]>()

  for (const [key, example] of Object.entries(map)) {
    const group = inferGroup(key)
    if (!grouped.has(group)) grouped.set(group, [])
    grouped.get(group)!.push({ name: key, example })
  }

  // Add the dynamic pageData entry
  if (!grouped.has('Page Data')) grouped.set('Page Data', [])
  grouped
    .get('Page Data')!
    .push({ name: 'pageData.<path>', example: '(dynamic — any dot path into page context)' })

  // Return in a stable order
  const displayOrder = [
    'Brand',
    'Resume Words',
    'Verb Words',
    'Adjective Words',
    'Content Words',
    'Page Terms',
    'Entity Data',
    'URL Suffix (shorthand)',
    'Page Data',
    'Other',
  ]

  return displayOrder
    .filter((g) => grouped.has(g))
    .map((g) => ({ group: g, variables: grouped.get(g)! }))
}
