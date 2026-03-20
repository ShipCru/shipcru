import type { TemplateWordPools } from '@/lib/keyword-landings/templatePatterns'

export interface SuffixWordEntry {
  value: string
  isCanonical: boolean
}

export interface SuffixWordsData {
  resumeWords: SuffixWordEntry[]
  adjectives: SuffixWordEntry[]
  builders: SuffixWordEntry[]
  verbs: SuffixWordEntry[]
  contentWords: SuffixWordEntry[]
  canonicalStrategy: string
}

export function getValues(entries: SuffixWordEntry[]): string[] {
  return entries.map((e) => e.value)
}

export function getCanonical(entries: SuffixWordEntry[]): string | null {
  return entries.find((e) => e.isCanonical)?.value ?? null
}

export function buildTemplateWordPools(data: SuffixWordsData): TemplateWordPools {
  return {
    resume: getValues(data.resumeWords),
    verb: getValues(data.verbs),
    verber: getValues(data.builders),
    adjective: getValues(data.adjectives),
    contentWord: getValues(data.contentWords),
  }
}

export function buildCanonicalWordPools(data: SuffixWordsData): TemplateWordPools {
  const wrap = (entries: SuffixWordEntry[]): string[] => {
    const v = getCanonical(entries)
    return v ? [v] : []
  }
  return {
    resume: wrap(data.resumeWords),
    verb: wrap(data.verbs),
    verber: wrap(data.builders),
    adjective: wrap(data.adjectives),
    contentWord: wrap(data.contentWords),
  }
}
