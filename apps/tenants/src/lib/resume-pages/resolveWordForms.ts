import type { WordFormSet } from '@/payload-types'

export interface ResumeWordsConfig {
  singular: string
  plural: string
  capitalized: string
  abbreviated: string
  abbreviatedCapitalized: string
  pluralCapitalized: string
  pluralAbbreviated: string
  pluralAbbreviatedCapitalized: string
}

export interface VerbFormsConfig {
  singular: string
  capitalized: string
  worder: string
  worderCapitalized: string
  wording: string
  wordingCapitalized: string
  past: string
  pastCapitalized: string
}

export interface AdjectiveFormsConfig {
  singular: string
  capitalized: string
  adverb: string
  adverbCapitalized: string
}

export interface ContentWordFormsConfig {
  singular: string
  plural: string
  capitalized: string
  pluralCapitalized: string
}

/**
 * Finds the best matching doc: tenant-specific first, then global (tenant=null).
 */
function findBestMatch(
  docs: WordFormSet[],
  type: WordFormSet['type'],
  matchFn: (doc: WordFormSet) => boolean,
  tenantId: string | number | null,
): WordFormSet | undefined {
  const matching = docs.filter((d) => d.type === type && matchFn(d))

  if (tenantId != null) {
    const tenantMatch = matching.find((d) => d.tenant === tenantId)
    if (tenantMatch) return tenantMatch
  }

  return matching.find((d) => d.tenant == null)
}

const s = (v: string | null | undefined): string => v || ''

export function resolveResumeWords(
  docs: WordFormSet[],
  lookupWord: string,
  tenantId: string | number | null,
): ResumeWordsConfig {
  const doc = findBestMatch(docs, 'resumeWord', (d) => d.rw_singular === lookupWord, tenantId)

  if (!doc) {
    return {
      singular: lookupWord,
      plural: '',
      capitalized: '',
      abbreviated: '',
      abbreviatedCapitalized: '',
      pluralCapitalized: '',
      pluralAbbreviated: '',
      pluralAbbreviatedCapitalized: '',
    }
  }

  return {
    singular: s(doc.rw_singular),
    plural: s(doc.rw_plural),
    capitalized: s(doc.rw_capitalized),
    abbreviated: s(doc.rw_abbreviated),
    abbreviatedCapitalized: s(doc.rw_abbreviatedCapitalized),
    pluralCapitalized: s(doc.rw_pluralCapitalized),
    pluralAbbreviated: s(doc.rw_pluralAbbreviated),
    pluralAbbreviatedCapitalized: s(doc.rw_pluralAbbreviatedCapitalized),
  }
}

export function resolveVerbForms(
  docs: WordFormSet[],
  builderWord: string,
  tenantId: string | number | null,
): VerbFormsConfig {
  const doc = findBestMatch(docs, 'verb', (d) => d.v_worder === builderWord, tenantId)

  if (!doc) {
    return {
      singular: builderWord,
      capitalized: '',
      worder: builderWord,
      worderCapitalized: '',
      wording: '',
      wordingCapitalized: '',
      past: '',
      pastCapitalized: '',
    }
  }

  return {
    singular: s(doc.v_singular),
    capitalized: s(doc.v_capitalized),
    worder: s(doc.v_worder),
    worderCapitalized: s(doc.v_worderCapitalized),
    wording: s(doc.v_wording),
    wordingCapitalized: s(doc.v_wordingCapitalized),
    past: s(doc.v_past),
    pastCapitalized: s(doc.v_pastCapitalized),
  }
}

export function resolveAdjectiveForms(
  docs: WordFormSet[],
  adjective: string,
  tenantId: string | number | null,
): AdjectiveFormsConfig {
  const doc = findBestMatch(docs, 'adjective', (d) => d.adj_singular === adjective, tenantId)

  if (!doc) {
    return { singular: adjective, capitalized: '', adverb: '', adverbCapitalized: '' }
  }

  return {
    singular: s(doc.adj_singular),
    capitalized: s(doc.adj_capitalized),
    adverb: s(doc.adj_adverb),
    adverbCapitalized: s(doc.adj_adverbCapitalized),
  }
}

export function resolveContentWordForms(
  docs: WordFormSet[],
  contentWord: string,
  tenantId: string | number | null,
): ContentWordFormsConfig {
  // Content words are looked up by plural (that's what appears in the URL)
  const doc = findBestMatch(docs, 'contentWord', (d) => d.cw_plural === contentWord, tenantId)

  if (!doc) {
    return { singular: contentWord, plural: '', capitalized: '', pluralCapitalized: '' }
  }

  return {
    singular: s(doc.cw_singular),
    plural: s(doc.cw_plural),
    capitalized: s(doc.cw_capitalized),
    pluralCapitalized: s(doc.cw_pluralCapitalized),
  }
}
