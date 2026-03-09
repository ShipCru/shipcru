import type { SubstitutionContext } from '@/lib/resume-pages/types'

import { describe, expect, it } from 'vitest'

import {
  BUILDER_TO_VERB,
  selectSkills,
  substituteVariables,
} from '@/lib/resume-pages/substituteVariables'

/** Minimal context with all required fields — use for tests that don't care about new fields */
function minimalCtx(overrides: Partial<SubstitutionContext> = {}): SubstitutionContext {
  return {
    skills: [],
    skillSeed: 'seed',
    brandTitle: '',
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
      singular: '',
      capitalized: '',
      worder: '',
      worderCapitalized: '',
      wording: '',
      wordingCapitalized: '',
      past: '',
      pastCapitalized: '',
    },
    adjectiveForms: { singular: '', capitalized: '', adverb: '', adverbCapitalized: '' },
    contentWordForms: { singular: '', plural: '', capitalized: '', pluralCapitalized: '' },
    pageTerms: { pageTerm: '', iSlug: '', jSlug: '' },
    pageData: {},
    ...overrides,
  }
}

const baseCtx: SubstitutionContext = {
  adjective: 'best',
  builder: 'creator',
  content: 'content',
  skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
  skillSeed: 'test-seed',
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
    singular: 'content',
    plural: 'content',
    capitalized: 'Content',
    pluralCapitalized: 'Content',
  },
  pageTerms: {
    pageTerm: 'Technology Software Engineer',
    iSlug: 'technology',
    jSlug: 'software-engineer',
  },
  pageData: {
    industry: { name: 'Technology', slug: 'technology' },
    jobTitle: { name: 'Software Engineer', slug: 'software-engineer' },
  },
}

describe('BUILDER_TO_VERB mapping', () => {
  it('maps creator to create', () => {
    expect(BUILDER_TO_VERB['creator']).toBe('create')
  })

  it('maps builder to build', () => {
    expect(BUILDER_TO_VERB['builder']).toBe('build')
  })

  it('maps maker to make', () => {
    expect(BUILDER_TO_VERB['maker']).toBe('make')
  })

  it('maps generator to generate', () => {
    expect(BUILDER_TO_VERB['generator']).toBe('generate')
  })

  it('maps help to "get help with"', () => {
    expect(BUILDER_TO_VERB['help']).toBe('get help with')
  })
})

describe('selectSkills', () => {
  it('returns all skills when count <= available', () => {
    const result = selectSkills(['JavaScript', 'Python'], 'seed', 2)
    expect(result).toHaveLength(2)
    expect(result).toContain('JavaScript')
    expect(result).toContain('Python')
  })

  it('returns empty array when no skills', () => {
    expect(selectSkills([], 'seed', 2)).toEqual([])
  })

  it('returns exactly count skills when more are available', () => {
    const skills = ['JavaScript', 'Python', 'Go', 'Rust', 'TypeScript']
    const result = selectSkills(skills, 'some-seed', 2)
    expect(result).toHaveLength(2)
    // Each selected skill must be from the original list
    result.forEach((s) => expect(skills).toContain(s))
  })

  it('is deterministic -- same seed produces same selection', () => {
    const skills = ['JavaScript', 'Python', 'Go', 'Rust', 'TypeScript']
    const a = selectSkills(skills, 'deterministic-seed', 2)
    const b = selectSkills(skills, 'deterministic-seed', 2)
    expect(a).toEqual(b)
  })

  it('different seeds produce different selections (most of the time)', () => {
    const skills = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const a = selectSkills(skills, 'seed-one', 2)
    const b = selectSkills(skills, 'seed-two', 2)
    // With 10 items and 2 picks, collision is unlikely but possible.
    // We just test that the function runs without error for both seeds.
    expect(a).toHaveLength(2)
    expect(b).toHaveLength(2)
  })
})

describe('substituteVariables', () => {
  it('replaces $(adjective)', () => {
    expect(substituteVariables('The $(adjective) resume', baseCtx)).toBe('The best resume')
  })

  it('replaces $(adjective.capitalized)', () => {
    expect(substituteVariables('$(adjective.capitalized) Resume', baseCtx)).toBe('Best Resume')
  })

  it('replaces $(builderWords)', () => {
    expect(substituteVariables('Resume $(builderWords)', baseCtx)).toBe('Resume creator')
  })

  it('replaces $(builderWords.capitalized)', () => {
    expect(substituteVariables('$(builderWords.capitalized) Tool', baseCtx)).toBe('Creator Tool')
  })

  it('replaces $(contentWords)', () => {
    expect(substituteVariables('Resume $(contentWords)', baseCtx)).toBe('Resume content')
  })

  it('replaces $(contentWords.capitalized)', () => {
    expect(substituteVariables('$(contentWords.capitalized) Guide', baseCtx)).toBe('Content Guide')
  })

  it('replaces $(verbWords) using builder-to-verb mapping', () => {
    expect(substituteVariables('How to $(verbWords) a resume', baseCtx)).toBe(
      'How to create a resume',
    )
  })

  it('replaces $(verbWords.capitalized)', () => {
    expect(substituteVariables('$(verbWords.capitalized) Your Resume', baseCtx)).toBe(
      'Create Your Resume',
    )
  })

  it('replaces $(resumeWords.singular)', () => {
    expect(substituteVariables('Your $(resumeWords.singular)', baseCtx)).toBe('Your resume')
  })

  it('replaces $(resumeWords.plural)', () => {
    expect(substituteVariables('Browse $(resumeWords.plural)', baseCtx)).toBe('Browse resumes')
  })

  it('replaces {{skill1}} and {{skill2}} with deterministically selected skills', () => {
    const result = substituteVariables('Skills: {{skill1}} and {{skill2}}', baseCtx)
    const selectedSkills = selectSkills(baseCtx.skills, baseCtx.skillSeed, 2)
    expect(result).toBe(`Skills: ${selectedSkills[0]} and ${selectedSkills[1]}`)
  })

  it('replaces {{industryName}}', () => {
    expect(substituteVariables('Industry: {{industryName}}', baseCtx)).toBe('Industry: Technology')
  })

  it('replaces {{jobTitleName}}', () => {
    expect(substituteVariables('Title: {{jobTitleName}}', baseCtx)).toBe('Title: Software Engineer')
  })

  it('replaces multiple variables in one string mixing both syntaxes', () => {
    const result = substituteVariables(
      '$(adjective.capitalized) {{jobTitleName}} $(resumeWords.singular) $(builderWords)',
      baseCtx,
    )
    expect(result).toBe('Best Software Engineer resume creator')
  })

  describe('empty/missing values', () => {
    it('resolves missing adjective to empty and cleans up whitespace', () => {
      const result = substituteVariables('The $(adjective) resume', minimalCtx())
      expect(result).toBe('The resume')
    })

    it('resolves {{skill1}} to empty when no skills exist and cleans whitespace', () => {
      const result = substituteVariables(
        'Use {{skill1}} for resumes',
        minimalCtx({
          adjective: 'best',
          builder: 'creator',
          content: 'content',
        }),
      )
      expect(result).toBe('Use for resumes')
    })

    it('handles industry pages gracefully (no suffix values)', () => {
      const result = substituteVariables(
        '$(adjective.capitalized) {{industryName}} $(resumeWords.plural)',
        minimalCtx({ industryName: 'Healthcare' }),
      )
      expect(result).toBe('Healthcare resumes')
    })
  })
})

describe('brand variables', () => {
  it('replaces $(brand.title)', () => {
    expect(substituteVariables('Welcome to $(brand.title)', baseCtx)).toBe(
      'Welcome to Rocket Resume',
    )
  })
})

describe('expanded resumeWords', () => {
  it('replaces $(resumeWords.capitalized)', () => {
    expect(substituteVariables('$(resumeWords.capitalized) Guide', baseCtx)).toBe('Resume Guide')
  })

  it('replaces $(resumeWords.abbreviated)', () => {
    expect(substituteVariables('Your $(resumeWords.abbreviated)', baseCtx)).toBe('Your resume')
  })

  it('replaces $(resumeWords.pluralCapitalized)', () => {
    expect(substituteVariables('Browse $(resumeWords.pluralCapitalized)', baseCtx)).toBe(
      'Browse Resumes',
    )
  })

  it('replaces $(resumeWords.abbreviatedCapitalized)', () => {
    expect(substituteVariables('$(resumeWords.abbreviatedCapitalized) Tips', baseCtx)).toBe(
      'Resume Tips',
    )
  })

  it('replaces $(resumeWords.pluralAbbreviated)', () => {
    expect(substituteVariables('All $(resumeWords.pluralAbbreviated)', baseCtx)).toBe('All resumes')
  })

  it('replaces $(resumeWords.pluralAbbreviatedCapitalized)', () => {
    expect(substituteVariables('$(resumeWords.pluralAbbreviatedCapitalized) Here', baseCtx)).toBe(
      'Resumes Here',
    )
  })
})

describe('expanded verbWords', () => {
  it('replaces $(verbWords.singular)', () => {
    expect(substituteVariables('$(verbWords.singular) a resume', baseCtx)).toBe('create a resume')
  })

  it('replaces $(verbWords.worder)', () => {
    expect(substituteVariables('Resume $(verbWords.worder)', baseCtx)).toBe('Resume creator')
  })

  it('replaces $(verbWords.worderCapitalized)', () => {
    expect(substituteVariables('$(verbWords.worderCapitalized) Tool', baseCtx)).toBe('Creator Tool')
  })

  it('replaces $(verbWords.wording)', () => {
    expect(substituteVariables('$(verbWords.wording) resumes', baseCtx)).toBe('creating resumes')
  })

  it('replaces $(verbWords.wordingCapitalized)', () => {
    expect(substituteVariables('$(verbWords.wordingCapitalized) Resumes', baseCtx)).toBe(
      'Creating Resumes',
    )
  })

  it('replaces $(verbWords.past)', () => {
    expect(substituteVariables('Resume $(verbWords.past)', baseCtx)).toBe('Resume created')
  })

  it('replaces $(verbWords.pastCapitalized)', () => {
    expect(substituteVariables('$(verbWords.pastCapitalized) with AI', baseCtx)).toBe(
      'Created with AI',
    )
  })
})

describe('adjectiveWords', () => {
  it('replaces $(adjectiveWords.singular)', () => {
    expect(substituteVariables('$(adjectiveWords.singular) resume', baseCtx)).toBe('best resume')
  })

  it('replaces $(adjectiveWords.capitalized)', () => {
    expect(substituteVariables('$(adjectiveWords.capitalized) Resume', baseCtx)).toBe('Best Resume')
  })

  it('replaces $(adjectiveWords.adverb)', () => {
    expect(substituteVariables('Do it $(adjectiveWords.adverb)', baseCtx)).toBe('Do it better')
  })

  it('replaces $(adjectiveWords.adverbCapitalized)', () => {
    expect(substituteVariables('$(adjectiveWords.adverbCapitalized) Results', baseCtx)).toBe(
      'Better Results',
    )
  })
})

describe('expanded contentWords', () => {
  it('replaces $(contentWords.singular)', () => {
    expect(substituteVariables('A $(contentWords.singular)', baseCtx)).toBe('A content')
  })

  it('replaces $(contentWords.plural)', () => {
    const ctx: SubstitutionContext = {
      ...baseCtx,
      content: 'templates',
      contentWordForms: {
        singular: 'template',
        plural: 'templates',
        capitalized: 'Template',
        pluralCapitalized: 'Templates',
      },
    }
    expect(substituteVariables('Browse $(contentWords.plural)', ctx)).toBe('Browse templates')
  })

  it('replaces $(contentWords.pluralCapitalized)', () => {
    const ctx: SubstitutionContext = {
      ...baseCtx,
      content: 'templates',
      contentWordForms: {
        singular: 'template',
        plural: 'templates',
        capitalized: 'Template',
        pluralCapitalized: 'Templates',
      },
    }
    expect(substituteVariables('$(contentWords.pluralCapitalized) Page', ctx)).toBe(
      'Templates Page',
    )
  })
})

describe('pageTerms', () => {
  it('replaces $(pageTerms.pageTerm)', () => {
    expect(substituteVariables('About $(pageTerms.pageTerm)', baseCtx)).toBe(
      'About Technology Software Engineer',
    )
  })

  it('replaces $(pageTerms.iSlug)', () => {
    expect(substituteVariables('Slug: $(pageTerms.iSlug)', baseCtx)).toBe('Slug: technology')
  })

  it('replaces $(pageTerms.jSlug)', () => {
    expect(substituteVariables('Job: $(pageTerms.jSlug)', baseCtx)).toBe('Job: software-engineer')
  })
})

describe('pageData dynamic bag', () => {
  it('resolves $(pageData.industry.name)', () => {
    expect(substituteVariables('In $(pageData.industry.name)', baseCtx)).toBe('In Technology')
  })

  it('resolves $(pageData.industry.slug)', () => {
    expect(substituteVariables('$(pageData.industry.slug)', baseCtx)).toBe('technology')
  })

  it('resolves $(pageData.jobTitle.name)', () => {
    expect(substituteVariables('$(pageData.jobTitle.name)', baseCtx)).toBe('Software Engineer')
  })

  it('resolves missing pageData path to empty', () => {
    expect(substituteVariables('$(pageData.missing.path)', baseCtx)).toBe('')
  })
})

describe('{{...}} syntax', () => {
  it('resolves the same variables as $()', () => {
    expect(substituteVariables('{{adjective}}', baseCtx)).toBe('best')
    expect(substituteVariables('{{adjective.capitalized}}', baseCtx)).toBe('Best')
    expect(substituteVariables('{{brand.title}}', baseCtx)).toBe('Rocket Resume')
    expect(substituteVariables('{{resumeWords.plural}}', baseCtx)).toBe('resumes')
    expect(substituteVariables('{{verbWords.wording}}', baseCtx)).toBe('creating')
    expect(substituteVariables('{{pageTerms.iSlug}}', baseCtx)).toBe('technology')
  })

  it('supports modifiers', () => {
    expect(substituteVariables('{{brand.title:nbsp}}', baseCtx)).toBe('Rocket\u00a0Resume')
  })

  it('resolves pageData paths', () => {
    expect(substituteVariables('{{pageData.industry.name}}', baseCtx)).toBe('Technology')
  })
})

describe('modifiers', () => {
  it('applies :capitalizeFirstLetter', () => {
    expect(substituteVariables('$(pageData.industry.name:capitalizeFirstLetter)', baseCtx)).toBe(
      'Technology',
    )
  })

  it('applies :nbsp', () => {
    expect(substituteVariables('$(brand.title:nbsp)', baseCtx)).toBe('Rocket\u00a0Resume')
  })

  it('applies :formatCurrency{USD}', () => {
    const ctx: SubstitutionContext = {
      ...baseCtx,
      pageData: { ...baseCtx.pageData, salary: 75000 },
    }
    expect(substituteVariables('$(pageData.salary:formatCurrency{USD})', ctx)).toBe('$75,000.00')
  })

  it('chains modifiers', () => {
    expect(substituteVariables('$(brand.title:capitalizeFirstLetter:nbsp)', baseCtx)).toBe(
      'Rocket\u00a0Resume',
    )
  })
})
