import type { Endpoint } from 'payload'

import { APIError } from 'payload'

const SEED_DATA = [
  // --- Resume Words ---
  {
    type: 'resumeWord',
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
    type: 'resumeWord',
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
    type: 'resumeWord',
    rw_singular: 'curriculum vitae',
    rw_plural: 'curricula vitae',
    rw_capitalized: 'Curriculum Vitae',
    rw_abbreviated: 'CV',
    rw_abbreviatedCapitalized: 'CV',
    rw_pluralCapitalized: 'Curricula Vitae',
    rw_pluralAbbreviated: 'CVs',
    rw_pluralAbbreviatedCapitalized: 'CVs',
  },
  // --- Verbs ---
  {
    type: 'verb',
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
    type: 'verb',
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
    type: 'verb',
    v_worder: 'maker',
    v_singular: 'make',
    v_capitalized: 'Make',
    v_worderCapitalized: 'Maker',
    v_wording: 'making',
    v_wordingCapitalized: 'Making',
    v_past: 'made',
    v_pastCapitalized: 'Made',
  },
  {
    type: 'verb',
    v_worder: 'writer',
    v_singular: 'write',
    v_capitalized: 'Write',
    v_worderCapitalized: 'Writer',
    v_wording: 'writing',
    v_wordingCapitalized: 'Writing',
    v_past: 'wrote',
    v_pastCapitalized: 'Wrote',
  },
  {
    type: 'verb',
    v_worder: 'generator',
    v_singular: 'generate',
    v_capitalized: 'Generate',
    v_worderCapitalized: 'Generator',
    v_wording: 'generating',
    v_wordingCapitalized: 'Generating',
    v_past: 'generated',
    v_pastCapitalized: 'Generated',
  },
  {
    type: 'verb',
    v_worder: 'editor',
    v_singular: 'edit',
    v_capitalized: 'Edit',
    v_worderCapitalized: 'Editor',
    v_wording: 'editing',
    v_wordingCapitalized: 'Editing',
    v_past: 'edited',
    v_pastCapitalized: 'Edited',
  },
  {
    type: 'verb',
    v_worder: 'help',
    v_singular: 'get help with',
    v_capitalized: 'Get Help With',
    v_worderCapitalized: 'Help',
    v_wording: 'getting help with',
    v_wordingCapitalized: 'Getting Help With',
    v_past: 'got help with',
    v_pastCapitalized: 'Got Help With',
  },
  // --- Adjectives ---
  {
    type: 'adjective',
    adj_singular: 'best',
    adj_capitalized: 'Best',
    adj_adverb: 'better',
    adj_adverbCapitalized: 'Better',
  },
  {
    type: 'adjective',
    adj_singular: 'perfect',
    adj_capitalized: 'Perfect',
    adj_adverb: 'perfectly',
    adj_adverbCapitalized: 'Perfectly',
  },
  {
    type: 'adjective',
    adj_singular: 'free',
    adj_capitalized: 'Free',
    adj_adverb: 'freely',
    adj_adverbCapitalized: 'Freely',
  },
  {
    type: 'adjective',
    adj_singular: 'easy',
    adj_capitalized: 'Easy',
    adj_adverb: 'easier',
    adj_adverbCapitalized: 'Easier',
  },
  {
    type: 'adjective',
    adj_singular: 'fast',
    adj_capitalized: 'Fast',
    adj_adverb: 'faster',
    adj_adverbCapitalized: 'Faster',
  },
  {
    type: 'adjective',
    adj_singular: 'simple',
    adj_capitalized: 'Simple',
    adj_adverb: 'easier',
    adj_adverbCapitalized: 'Easier',
  },
  {
    type: 'adjective',
    adj_singular: 'smart',
    adj_capitalized: 'Smart',
    adj_adverb: 'smarter',
    adj_adverbCapitalized: 'Smarter',
  },
  {
    type: 'adjective',
    adj_singular: 'professional',
    adj_capitalized: 'Professional',
    adj_adverb: 'professionally',
    adj_adverbCapitalized: 'Professionally',
  },
  {
    type: 'adjective',
    adj_singular: 'top',
    adj_capitalized: 'Top',
    adj_adverb: 'higher',
    adj_adverbCapitalized: 'Higher',
  },
  // --- Content Words ---
  {
    type: 'contentWord',
    cw_singular: 'template',
    cw_plural: 'templates',
    cw_capitalized: 'Template',
    cw_pluralCapitalized: 'Templates',
  },
  {
    type: 'contentWord',
    cw_singular: 'example',
    cw_plural: 'examples',
    cw_capitalized: 'Example',
    cw_pluralCapitalized: 'Examples',
  },
  {
    type: 'contentWord',
    cw_singular: 'sample',
    cw_plural: 'samples',
    cw_capitalized: 'Sample',
    cw_pluralCapitalized: 'Samples',
  },
  {
    type: 'contentWord',
    cw_singular: 'idea',
    cw_plural: 'ideas',
    cw_capitalized: 'Idea',
    cw_pluralCapitalized: 'Ideas',
  },
  {
    type: 'contentWord',
    cw_singular: 'suggestion',
    cw_plural: 'suggestions',
    cw_capitalized: 'Suggestion',
    cw_pluralCapitalized: 'Suggestions',
  },
  {
    type: 'contentWord',
    cw_singular: 'section',
    cw_plural: 'sections',
    cw_capitalized: 'Section',
    cw_pluralCapitalized: 'Sections',
  },
  {
    type: 'contentWord',
    cw_singular: 'content',
    cw_plural: 'content',
    cw_capitalized: 'Content',
    cw_pluralCapitalized: 'Content',
  },
  {
    type: 'contentWord',
    cw_singular: 'copy',
    cw_plural: 'copy',
    cw_capitalized: 'Copy',
    cw_pluralCapitalized: 'Copy',
  },
]

export interface SeedWordFormSetsResult {
  created: number
  skipped: number
  total: number
}

export const seedWordFormSetsEndpoint: Endpoint = {
  path: '/seed',
  method: 'post',
  handler: async (req) => {
    if (!req.user) {
      throw new APIError('Unauthorized', 401)
    }

    const existing = await req.payload.find({
      collection: 'word-form-sets',
      limit: 0,
      depth: 0,
    })

    if (existing.totalDocs > 0) {
      return Response.json({
        created: 0,
        skipped: existing.totalDocs,
        total: existing.totalDocs,
      } satisfies SeedWordFormSetsResult)
    }

    const results = await Promise.all(
      SEED_DATA.map((data) =>
        req.payload.create({
          collection: 'word-form-sets',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: data as any,
          context: { disableRevalidate: true },
        }),
      ),
    )

    return Response.json({
      created: results.length,
      skipped: 0,
      total: results.length,
    } satisfies SeedWordFormSetsResult)
  },
}
