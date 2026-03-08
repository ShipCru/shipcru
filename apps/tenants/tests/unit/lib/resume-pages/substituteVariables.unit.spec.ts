import type { SubstitutionContext } from '@/lib/resume-pages/types'

import { describe, expect, it } from 'vitest'

import {
  BUILDER_TO_VERB,
  selectSkills,
  substituteVariables,
} from '@/lib/resume-pages/substituteVariables'

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
  const baseCtx: SubstitutionContext = {
    adjective: 'best',
    builder: 'creator',
    content: 'content',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    skillSeed: 'test-seed',
    industryName: 'Technology',
    jobTitleName: 'Software Engineer',
  }

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

  it('replaces {skill1} and {skill2} with deterministically selected skills', () => {
    const result = substituteVariables('Skills: {skill1} and {skill2}', baseCtx)
    // We can't know which skills are selected without running the RNG,
    // but we know they must be from the original list
    const selectedSkills = selectSkills(baseCtx.skills, baseCtx.skillSeed, 2)
    expect(result).toBe(`Skills: ${selectedSkills[0]} and ${selectedSkills[1]}`)
  })

  it('replaces {industryName}', () => {
    expect(substituteVariables('Industry: {industryName}', baseCtx)).toBe('Industry: Technology')
  })

  it('replaces {jobTitleName}', () => {
    expect(substituteVariables('Title: {jobTitleName}', baseCtx)).toBe('Title: Software Engineer')
  })

  it('replaces multiple variables in one string', () => {
    const result = substituteVariables(
      '$(adjective.capitalized) {jobTitleName} $(resumeWords.singular) $(builderWords)',
      baseCtx,
    )
    expect(result).toBe('Best Software Engineer resume creator')
  })

  describe('empty/missing values', () => {
    it('resolves missing adjective to empty and cleans up whitespace', () => {
      const ctx: SubstitutionContext = {
        skills: [],
        skillSeed: 'seed',
      }
      const result = substituteVariables('The $(adjective) resume', ctx)
      expect(result).toBe('The resume')
    })

    it('resolves {skill1} to empty when no skills exist and cleans whitespace', () => {
      const ctx: SubstitutionContext = {
        adjective: 'best',
        builder: 'creator',
        content: 'content',
        skills: [],
        skillSeed: 'seed',
      }
      const result = substituteVariables('Use {skill1} for resumes', ctx)
      expect(result).toBe('Use for resumes')
    })

    it('handles industry pages gracefully (no suffix values)', () => {
      const ctx: SubstitutionContext = {
        skills: [],
        skillSeed: '',
        industryName: 'Healthcare',
      }
      const result = substituteVariables(
        '$(adjective.capitalized) {industryName} $(resumeWords.plural)',
        ctx,
      )
      expect(result).toBe('Healthcare resumes')
    })
  })
})
