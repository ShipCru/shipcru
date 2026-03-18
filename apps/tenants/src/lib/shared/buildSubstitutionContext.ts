import type { SubstitutionContext } from '@/lib/resume-pages/types'
import type { WordFormSet } from '@/payload-types'
import type { ResolvedTenant } from '@/utils/resolveTenant'

import { resolveAllWordForms } from '@/lib/resume-pages/resolveWordForms'

export type SubstitutionContextInput =
  | {
      kind: 'keyword'
      tenant: ResolvedTenant
      parsed: {
        adjective: string | null
        resumeWord: string
        builder: string | null
        contentWord: string | null
      }
      wordFormSets: WordFormSet[]
      contentSeed: string
    }
  | {
      kind: 'resume'
      tenant: ResolvedTenant
      parsed: { adjective?: string; builder?: string; content?: string }
      entity: {
        industryName: string
        jobTitleName?: string
        skills: string[]
      }
      wordFormSets: WordFormSet[]
      contentSeed: string
      industrySlug: string
      jobTitleSlug?: string
      pageType: 'industry' | 'job-title'
    }

export function buildSubstitutionContext(input: SubstitutionContextInput): SubstitutionContext {
  if (input.kind === 'keyword') {
    const { tenant, parsed, wordFormSets, contentSeed } = input
    return {
      adjective: parsed.adjective ?? '',
      builder: parsed.builder ?? '',
      content: parsed.contentWord ?? '',
      skills: [],
      skillSeed: contentSeed,
      industryName: '',
      jobTitleName: '',
      brandTitle: tenant.name,
      ...resolveAllWordForms(
        wordFormSets,
        {
          resumeWord: parsed.resumeWord,
          builder: parsed.builder,
          adjective: parsed.adjective,
          contentWord: parsed.contentWord,
        },
        tenant.id,
      ),
      pageTerms: { pageTerm: contentSeed, iSlug: '', jSlug: '' },
      pageData: {},
    }
  }

  const {
    tenant,
    parsed,
    entity,
    wordFormSets,
    contentSeed,
    industrySlug,
    jobTitleSlug,
    pageType,
  } = input
  return {
    adjective: parsed.adjective,
    builder: parsed.builder,
    content: parsed.content,
    skills: entity.skills,
    skillSeed: `${tenant.slug}.${contentSeed}.skills`,
    industryName: entity.industryName,
    jobTitleName: entity.jobTitleName,
    brandTitle: process.env.NEXT_PUBLIC_BRAND_TITLE || tenant.name,
    ...resolveAllWordForms(
      wordFormSets,
      {
        resumeWord: 'resume',
        builder: parsed.builder,
        adjective: parsed.adjective,
        contentWord: parsed.content,
      },
      tenant.id,
    ),
    pageTerms: {
      pageTerm: pageType === 'job-title' ? entity.jobTitleName || '' : entity.industryName || '',
      iSlug: industrySlug,
      jSlug: jobTitleSlug || '',
    },
    pageData: {
      industry: { name: entity.industryName, slug: industrySlug },
      ...(pageType === 'job-title' && entity.jobTitleName
        ? { jobTitle: { name: entity.jobTitleName, slug: jobTitleSlug } }
        : {}),
    },
  }
}
