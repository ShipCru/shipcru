import type { CollectionBeforeValidateHook, CollectionConfig, Field } from 'payload'

import { authenticated } from '@/access/authenticated'
import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import { tenantAdminAccess } from '@/access/tenantAdminAccess'
import {
  createCollectionDeleteRevalidationHook,
  createCollectionRevalidationHook,
} from '@/lib/resume-pages/hooks/revalidateResumeData'
import { seedWordFormSetsEndpoint } from './endpoints/seedWordFormSets'

/** Lookup field per type — the primary identifier for each word form set */
const LOOKUP_FIELD: Record<string, string> = {
  resumeWord: 'rw_singular',
  verb: 'v_worder',
  adjective: 'adj_singular',
  contentWord: 'cw_plural',
}

/** Auto-generate `name` from the type-specific lookup field */
const autoGenerateName: CollectionBeforeValidateHook = ({ data }) => {
  if (!data?.type) return data
  const lookupField = LOOKUP_FIELD[data.type]
  if (lookupField && data[lookupField]) {
    data.name = data[lookupField]
  }
  return data
}

/** Condition helpers for conditional fields per type */
const isType = (type: string) => (_data: unknown, siblingData: Record<string, unknown>) =>
  siblingData?.type === type

const isResumeWord = isType('resumeWord')
const isVerb = isType('verb')
const isAdjective = isType('adjective')
const isContentWord = isType('contentWord')

export const WordFormSets: CollectionConfig = {
  slug: 'word-form-sets',
  admin: {
    useAsTitle: 'name',
    group: 'Template Variables',
    defaultColumns: ['name', 'type', 'tenant'],
    listSearchableFields: ['name'],
    components: {
      beforeList: ['@/components/admin/WordFormSetsListActions#WordFormSetsListActions'],
    },
  },
  endpoints: [seedWordFormSetsEndpoint],
  access: {
    create: tenantAdminAccess,
    read: authenticated,
    update: tenantAdminAccess,
    delete: isSuperAdminAccess,
  },
  hooks: {
    beforeValidate: [autoGenerateName],
    afterChange: [createCollectionRevalidationHook('word-form-sets')],
    afterDelete: [createCollectionDeleteRevalidationHook('word-form-sets')],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Resume Word', value: 'resumeWord' },
        { label: 'Verb', value: 'verb' },
        { label: 'Adjective', value: 'adjective' },
        { label: 'Content Word', value: 'contentWord' },
      ],
      admin: {
        description: 'Which category of word forms this entry defines',
      },
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      admin: {
        position: 'sidebar',
        description: 'Leave empty for a global default. Set to override for a specific tenant.',
      },
    },

    ...resumeWordFields(),
    ...verbFields(),
    ...adjectiveFields(),
    ...contentWordFields(),
  ],
  timestamps: true,
}

/** Resume Word fields — lookup field: rw_singular (matched against URL base path word) */
function resumeWordFields(): Field[] {
  return [
    {
      name: 'rw_singular',
      label: 'Singular',
      type: 'text',
      admin: { condition: isResumeWord, description: 'e.g., "resume", "CV", "curriculum vitae"' },
    },
    {
      name: 'rw_plural',
      label: 'Plural',
      type: 'text',
      admin: { condition: isResumeWord, description: 'e.g., "resumes", "CVs", "curricula vitae"' },
    },
    {
      name: 'rw_capitalized',
      label: 'Capitalized',
      type: 'text',
      admin: { condition: isResumeWord, description: 'e.g., "Resume", "CV", "Curriculum Vitae"' },
    },
    {
      name: 'rw_abbreviated',
      label: 'Abbreviated',
      type: 'text',
      admin: { condition: isResumeWord, description: 'e.g., "resume", "CV"' },
    },
    {
      name: 'rw_abbreviatedCapitalized',
      label: 'Abbreviated Capitalized',
      type: 'text',
      admin: { condition: isResumeWord, description: 'e.g., "Resume", "CV"' },
    },
    {
      name: 'rw_pluralCapitalized',
      label: 'Plural Capitalized',
      type: 'text',
      admin: { condition: isResumeWord, description: 'e.g., "Resumes", "CVs"' },
    },
    {
      name: 'rw_pluralAbbreviated',
      label: 'Plural Abbreviated',
      type: 'text',
      admin: { condition: isResumeWord, description: 'e.g., "resumes", "CVs"' },
    },
    {
      name: 'rw_pluralAbbreviatedCapitalized',
      label: 'Plural Abbreviated Capitalized',
      type: 'text',
      admin: { condition: isResumeWord, description: 'e.g., "Resumes", "CVs"' },
    },
  ]
}

/** Verb fields — lookup field: v_worder (matched against parsed.builder from URL) */
function verbFields(): Field[] {
  return [
    {
      name: 'v_worder',
      label: 'Builder Word (-er form)',
      type: 'text',
      admin: {
        condition: isVerb,
        description: 'The URL suffix word, e.g., "creator", "builder", "maker"',
      },
    },
    {
      name: 'v_singular',
      label: 'Base Verb',
      type: 'text',
      admin: { condition: isVerb, description: 'e.g., "create", "build", "make"' },
    },
    {
      name: 'v_capitalized',
      label: 'Base Verb Capitalized',
      type: 'text',
      admin: { condition: isVerb, description: 'e.g., "Create", "Build"' },
    },
    {
      name: 'v_worderCapitalized',
      label: 'Builder Word Capitalized',
      type: 'text',
      admin: { condition: isVerb, description: 'e.g., "Creator", "Builder"' },
    },
    {
      name: 'v_wording',
      label: 'Gerund (-ing)',
      type: 'text',
      admin: { condition: isVerb, description: 'e.g., "creating", "building"' },
    },
    {
      name: 'v_wordingCapitalized',
      label: 'Gerund Capitalized',
      type: 'text',
      admin: { condition: isVerb, description: 'e.g., "Creating", "Building"' },
    },
    {
      name: 'v_past',
      label: 'Past Tense',
      type: 'text',
      admin: { condition: isVerb, description: 'e.g., "created", "built", "wrote"' },
    },
    {
      name: 'v_pastCapitalized',
      label: 'Past Tense Capitalized',
      type: 'text',
      admin: { condition: isVerb, description: 'e.g., "Created", "Built"' },
    },
  ]
}

/** Adjective fields — lookup field: adj_singular (matched against parsed.adjective from URL) */
function adjectiveFields(): Field[] {
  return [
    {
      name: 'adj_singular',
      label: 'Adjective',
      type: 'text',
      admin: { condition: isAdjective, description: 'e.g., "best", "professional", "simple"' },
    },
    {
      name: 'adj_capitalized',
      label: 'Adjective Capitalized',
      type: 'text',
      admin: { condition: isAdjective, description: 'e.g., "Best", "Professional"' },
    },
    {
      name: 'adj_adverb',
      label: 'Adverb / Comparative',
      type: 'text',
      admin: { condition: isAdjective, description: 'e.g., "better", "professionally", "easier"' },
    },
    {
      name: 'adj_adverbCapitalized',
      label: 'Adverb Capitalized',
      type: 'text',
      admin: { condition: isAdjective, description: 'e.g., "Better", "Professionally"' },
    },
  ]
}

/** Content Word fields — lookup field: cw_plural (matched against parsed.content from URL) */
function contentWordFields(): Field[] {
  return [
    {
      name: 'cw_singular',
      label: 'Singular',
      type: 'text',
      admin: { condition: isContentWord, description: 'e.g., "template", "example", "content"' },
    },
    {
      name: 'cw_plural',
      label: 'Plural',
      type: 'text',
      admin: {
        condition: isContentWord,
        description: 'e.g., "templates", "examples", "content" (same for uncountable)',
      },
    },
    {
      name: 'cw_capitalized',
      label: 'Singular Capitalized',
      type: 'text',
      admin: { condition: isContentWord, description: 'e.g., "Template", "Content"' },
    },
    {
      name: 'cw_pluralCapitalized',
      label: 'Plural Capitalized',
      type: 'text',
      admin: { condition: isContentWord, description: 'e.g., "Templates", "Content"' },
    },
  ]
}
