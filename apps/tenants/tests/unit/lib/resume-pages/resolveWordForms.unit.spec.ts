// tests/unit/lib/resume-pages/resolveWordForms.unit.spec.ts
import type { WordFormSet } from '@/payload-types'

import { describe, expect, it } from 'vitest'

import {
  resolveAdjectiveForms,
  resolveContentWordForms,
  resolveResumeWords,
  resolveVerbForms,
} from '@/lib/resume-pages/resolveWordForms'

const GLOBAL_DOCS: Record<string, unknown>[] = [
  {
    id: '1',
    type: 'resumeWord',
    tenant: null,
    rw_singular: 'resume',
    rw_plural: 'resumes',
    rw_capitalized: 'Resume',
    rw_abbreviated: 'resume',
    rw_abbreviatedCapitalized: 'Resume',
    rw_pluralCapitalized: 'Resumes',
    rw_pluralAbbreviated: 'resumes',
    rw_pluralAbbreviatedCapitalized: 'Resumes',
  },
  {
    id: '2',
    type: 'resumeWord',
    tenant: null,
    rw_singular: 'CV',
    rw_plural: 'CVs',
    rw_capitalized: 'CV',
    rw_abbreviated: 'CV',
    rw_abbreviatedCapitalized: 'CV',
    rw_pluralCapitalized: 'CVs',
    rw_pluralAbbreviated: 'CVs',
    rw_pluralAbbreviatedCapitalized: 'CVs',
  },
  {
    id: '3',
    type: 'verb',
    tenant: null,
    v_worder: 'creator',
    v_singular: 'create',
    v_capitalized: 'Create',
    v_worderCapitalized: 'Creator',
    v_wording: 'creating',
    v_wordingCapitalized: 'Creating',
    v_past: 'created',
    v_pastCapitalized: 'Created',
  },
  {
    id: '4',
    type: 'verb',
    tenant: null,
    v_worder: 'builder',
    v_singular: 'build',
    v_capitalized: 'Build',
    v_worderCapitalized: 'Builder',
    v_wording: 'building',
    v_wordingCapitalized: 'Building',
    v_past: 'built',
    v_pastCapitalized: 'Built',
  },
  {
    id: '5',
    type: 'adjective',
    tenant: null,
    adj_singular: 'best',
    adj_capitalized: 'Best',
    adj_adverb: 'better',
    adj_adverbCapitalized: 'Better',
  },
  {
    id: '6',
    type: 'adjective',
    tenant: null,
    adj_singular: 'professional',
    adj_capitalized: 'Professional',
    adj_adverb: 'professionally',
    adj_adverbCapitalized: 'Professionally',
  },
  {
    id: '7',
    type: 'contentWord',
    tenant: null,
    cw_singular: 'template',
    cw_plural: 'templates',
    cw_capitalized: 'Template',
    cw_pluralCapitalized: 'Templates',
  },
  {
    id: '8',
    type: 'contentWord',
    tenant: null,
    cw_singular: 'content',
    cw_plural: 'content',
    cw_capitalized: 'Content',
    cw_pluralCapitalized: 'Content',
  },
]

const TENANT_OVERRIDE = {
  id: '10',
  type: 'adjective',
  tenant: 'tenant-1',
  adj_singular: 'best',
  adj_capitalized: 'Top-Rated',
  adj_adverb: 'even better',
  adj_adverbCapitalized: 'Even Better',
}

const ALL_DOCS = [...GLOBAL_DOCS, TENANT_OVERRIDE] as unknown as WordFormSet[]

describe('resolveResumeWords', () => {
  it('returns matching resume word forms', () => {
    const result = resolveResumeWords(ALL_DOCS, 'resume', null)
    expect(result.singular).toBe('resume')
    expect(result.plural).toBe('resumes')
    expect(result.capitalized).toBe('Resume')
    expect(result.pluralAbbreviatedCapitalized).toBe('Resumes')
  })

  it('returns CV forms', () => {
    const result = resolveResumeWords(ALL_DOCS, 'CV', null)
    expect(result.singular).toBe('CV')
    expect(result.plural).toBe('CVs')
  })

  it('returns empty defaults for unknown word', () => {
    const result = resolveResumeWords(ALL_DOCS, 'unknown', null)
    expect(result.singular).toBe('unknown')
    expect(result.plural).toBe('')
  })
})

describe('resolveVerbForms', () => {
  it('returns matching verb forms by worder', () => {
    const result = resolveVerbForms(ALL_DOCS, 'creator', null)
    expect(result.singular).toBe('create')
    expect(result.worder).toBe('creator')
    expect(result.wording).toBe('creating')
    expect(result.past).toBe('created')
  })

  it('returns builder forms', () => {
    const result = resolveVerbForms(ALL_DOCS, 'builder', null)
    expect(result.singular).toBe('build')
    expect(result.past).toBe('built')
  })

  it('returns empty defaults for unknown verb', () => {
    const result = resolveVerbForms(ALL_DOCS, 'zapper', null)
    expect(result.singular).toBe('zapper')
    expect(result.worder).toBe('zapper')
    expect(result.wording).toBe('')
  })
})

describe('resolveAdjectiveForms', () => {
  it('returns global adjective when no tenant override', () => {
    const result = resolveAdjectiveForms(ALL_DOCS, 'best', null)
    expect(result.singular).toBe('best')
    expect(result.capitalized).toBe('Best')
    expect(result.adverb).toBe('better')
  })

  it('returns tenant override when tenant matches', () => {
    const result = resolveAdjectiveForms(ALL_DOCS, 'best', 'tenant-1')
    expect(result.singular).toBe('best')
    expect(result.capitalized).toBe('Top-Rated')
    expect(result.adverb).toBe('even better')
  })

  it('returns global when tenant has no override', () => {
    const result = resolveAdjectiveForms(ALL_DOCS, 'best', 'tenant-2')
    expect(result.singular).toBe('best')
    expect(result.capitalized).toBe('Best')
  })

  it('returns empty defaults for unknown adjective', () => {
    const result = resolveAdjectiveForms(ALL_DOCS, 'unknown', null)
    expect(result.singular).toBe('unknown')
    expect(result.adverb).toBe('')
  })
})

describe('resolveContentWordForms', () => {
  it('returns matching content word forms by plural', () => {
    const result = resolveContentWordForms(ALL_DOCS, 'templates', null)
    expect(result.singular).toBe('template')
    expect(result.plural).toBe('templates')
    expect(result.pluralCapitalized).toBe('Templates')
  })

  it('returns uncountable content word', () => {
    const result = resolveContentWordForms(ALL_DOCS, 'content', null)
    expect(result.singular).toBe('content')
    expect(result.plural).toBe('content')
  })

  it('returns empty defaults for unknown word', () => {
    const result = resolveContentWordForms(ALL_DOCS, 'unknown', null)
    expect(result.singular).toBe('unknown')
    expect(result.plural).toBe('')
  })
})
