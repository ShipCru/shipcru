import { describe, expect, it } from 'vitest'

import {
  compileTemplatePattern,
  matchSlugAgainstTemplate,
  matchSlugToTemplates,
  TEMPLATE_VARIABLES,
  type TemplateWordPools,
  validateTemplatePattern,
} from '@/lib/keyword-landings/templatePatterns'

const wordPools: TemplateWordPools = {
  resume: ['resume', 'cv', 'curriculum-vitae'],
  verb: ['build', 'make', 'create'],
  verber: ['builder', 'maker', 'creator'],
  adjective: ['free', 'best', 'professional'],
  contentWord: ['templates', 'examples', 'samples'],
}

describe('TEMPLATE_VARIABLES', () => {
  it('maps resume to resumeWord type with rw_singular slug field', () => {
    expect(TEMPLATE_VARIABLES.resume).toEqual({
      wordFormSetType: 'resumeWord',
      slugField: 'rw_singular',
    })
  })

  it('maps verb to verb type with v_singular slug field', () => {
    expect(TEMPLATE_VARIABLES.verb).toEqual({
      wordFormSetType: 'verb',
      slugField: 'v_singular',
    })
  })

  it('maps verber to verb type with v_worder slug field', () => {
    expect(TEMPLATE_VARIABLES.verber).toEqual({
      wordFormSetType: 'verb',
      slugField: 'v_worder',
    })
  })

  it('maps adjective to adjective type with adj_singular slug field', () => {
    expect(TEMPLATE_VARIABLES.adjective).toEqual({
      wordFormSetType: 'adjective',
      slugField: 'adj_singular',
    })
  })

  it('maps contentWord to contentWord type with cw_plural slug field', () => {
    expect(TEMPLATE_VARIABLES.contentWord).toEqual({
      wordFormSetType: 'contentWord',
      slugField: 'cw_plural',
    })
  })
})

describe('validateTemplatePattern', () => {
  it('accepts pattern with a single known variable', () => {
    const result = validateTemplatePattern('$(resume)-$(verber)')
    expect(result).toEqual({ valid: true })
  })

  it('accepts pattern with all known variables', () => {
    const result = validateTemplatePattern(
      '$(adjective)-$(resume)-$(verber)-$(contentWord)-$(verb)',
    )
    expect(result).toEqual({ valid: true })
  })

  it('accepts pattern with literals and variables', () => {
    const result = validateTemplatePattern('how-to-$(verb)-a-$(resume)')
    expect(result).toEqual({ valid: true })
  })

  it('rejects empty pattern', () => {
    const result = validateTemplatePattern('')
    expect(result.valid).toBe(false)
    expect(result).toHaveProperty('error')
  })

  it('rejects pattern with no variables', () => {
    const result = validateTemplatePattern('just-literal-text')
    expect(result.valid).toBe(false)
    expect(result).toHaveProperty('error')
  })

  it('rejects pattern with unknown variable', () => {
    const result = validateTemplatePattern('$(resume)-$(unknown)')
    expect(result.valid).toBe(false)
    expect(result).toHaveProperty('error')
  })

  it('rejects pattern with malformed variable syntax', () => {
    const result = validateTemplatePattern('$(resume)-$verb')
    expect(result.valid).toBe(false)
    expect(result).toHaveProperty('error')
  })
})

describe('compileTemplatePattern', () => {
  it('compiles simple two-variable pattern', () => {
    const compiled = compileTemplatePattern('$(resume)-$(verber)', wordPools)

    expect(compiled.pattern).toBe('$(resume)-$(verber)')
    expect(compiled.variableNames).toEqual(['resume', 'verber'])
    expect(compiled.regex).toBeInstanceOf(RegExp)

    expect(compiled.regex.test('resume-builder')).toBe(true)
    expect(compiled.regex.test('cv-maker')).toBe(true)
    expect(compiled.regex.test('curriculum-vitae-creator')).toBe(true)
    expect(compiled.regex.test('hello-world')).toBe(false)
  })

  it('compiles pattern with literal segments', () => {
    const compiled = compileTemplatePattern('how-to-$(verb)-a-$(resume)', wordPools)

    expect(compiled.variableNames).toEqual(['verb', 'resume'])

    expect(compiled.regex.test('how-to-build-a-resume')).toBe(true)
    expect(compiled.regex.test('how-to-create-a-cv')).toBe(true)
    expect(compiled.regex.test('how-to-build-a-template')).toBe(false)
  })

  it('compiles pattern with all variables', () => {
    const compiled = compileTemplatePattern(
      '$(adjective)-$(resume)-$(verber)-$(contentWord)-$(verb)',
      wordPools,
    )

    expect(compiled.variableNames).toEqual(['adjective', 'resume', 'verber', 'contentWord', 'verb'])
    expect(compiled.regex.test('free-resume-builder-templates-build')).toBe(true)
    expect(compiled.regex.test('best-cv-maker-examples-create')).toBe(true)
  })

  it('sorts words longest-first so multi-word entries match before shorter', () => {
    const compiled = compileTemplatePattern('$(resume)-$(verber)', wordPools)

    expect(compiled.regex.test('curriculum-vitae-creator')).toBe(true)

    const match = 'curriculum-vitae-creator'.match(compiled.regex)
    expect(match).not.toBeNull()
    expect(match![1]).toBe('curriculum-vitae')
    expect(match![2]).toBe('creator')
  })

  it('escapes regex special characters in literal segments', () => {
    const compiled = compileTemplatePattern('build.a-$(resume)', wordPools)

    expect(compiled.regex.test('build.a-resume')).toBe(true)
    expect(compiled.regex.test('buildXa-resume')).toBe(false)
  })

  it('counts literal segments correctly', () => {
    const noLiterals = compileTemplatePattern('$(resume)-$(verber)', wordPools)
    expect(noLiterals.literalSegments).toBe(1) // just the hyphen

    const withLiterals = compileTemplatePattern('how-to-$(verb)-a-$(resume)', wordPools)
    expect(withLiterals.literalSegments).toBe(10) // "how-to-" (7) + "-a-" (3)

    const allVars = compileTemplatePattern('$(adjective)$(resume)', wordPools)
    expect(allVars.literalSegments).toBe(0)
  })
})

describe('matchSlugAgainstTemplate', () => {
  it('extracts variables from a matching slug', () => {
    const compiled = compileTemplatePattern('$(adjective)-$(resume)-$(verber)', wordPools)
    const result = matchSlugAgainstTemplate('free-resume-builder', compiled)

    expect(result).not.toBeNull()
    expect(result!.variables).toEqual({
      adjective: 'free',
      resume: 'resume',
      verber: 'builder',
    })
    expect(result!.template).toBe('$(adjective)-$(resume)-$(verber)')
  })

  it('extracts multi-word variable values', () => {
    const compiled = compileTemplatePattern('$(resume)-$(verber)', wordPools)
    const result = matchSlugAgainstTemplate('curriculum-vitae-creator', compiled)

    expect(result).not.toBeNull()
    expect(result!.variables).toEqual({
      resume: 'curriculum-vitae',
      verber: 'creator',
    })
  })

  it('extracts variables from pattern with literals', () => {
    const compiled = compileTemplatePattern('how-to-$(verb)-a-$(resume)', wordPools)
    const result = matchSlugAgainstTemplate('how-to-build-a-cv', compiled)

    expect(result).not.toBeNull()
    expect(result!.variables).toEqual({
      verb: 'build',
      resume: 'cv',
    })
  })

  it('returns null for non-matching slug', () => {
    const compiled = compileTemplatePattern('$(resume)-$(verber)', wordPools)
    const result = matchSlugAgainstTemplate('hello-world', compiled)

    expect(result).toBeNull()
  })

  it('returns null for partial match', () => {
    const compiled = compileTemplatePattern('$(adjective)-$(resume)-$(verber)', wordPools)
    const result = matchSlugAgainstTemplate('resume-builder', compiled)

    expect(result).toBeNull()
  })

  it('returns null for slug with extra segments', () => {
    const compiled = compileTemplatePattern('$(resume)-$(verber)', wordPools)
    const result = matchSlugAgainstTemplate('free-resume-builder', compiled)

    expect(result).toBeNull()
  })
})

describe('matchSlugToTemplates', () => {
  const patterns = [
    '$(resume)-$(verber)',
    '$(resume)-$(contentWord)',
    'how-to-$(verb)-a-$(resume)',
    '$(adjective)-$(resume)-$(verber)',
    '$(adjective)-$(resume)-$(contentWord)',
    '$(adjective)-$(resume)-$(verber)-$(contentWord)',
  ]

  it('matches resume-builder to $(resume)-$(verber)', () => {
    const result = matchSlugToTemplates('resume-builder', patterns, wordPools)
    expect(result).not.toBeNull()
    expect(result!.template).toBe('$(resume)-$(verber)')
    expect(result!.variables.resume).toBe('resume')
    expect(result!.variables.verber).toBe('builder')
  })

  it('matches how-to-make-a-cv', () => {
    const result = matchSlugToTemplates('how-to-make-a-cv', patterns, wordPools)
    expect(result).not.toBeNull()
    expect(result!.template).toBe('how-to-$(verb)-a-$(resume)')
    expect(result!.variables.verb).toBe('make')
    expect(result!.variables.resume).toBe('cv')
  })

  it('matches free-resume-builder to $(adjective)-$(resume)-$(verber)', () => {
    const result = matchSlugToTemplates('free-resume-builder', patterns, wordPools)
    expect(result).not.toBeNull()
    expect(result!.template).toBe('$(adjective)-$(resume)-$(verber)')
  })

  it('matches resume-templates to $(resume)-$(contentWord)', () => {
    const result = matchSlugToTemplates('resume-templates', patterns, wordPools)
    expect(result).not.toBeNull()
    expect(result!.template).toBe('$(resume)-$(contentWord)')
    expect(result!.variables.contentWord).toBe('templates')
  })

  it('matches full 4-part slug', () => {
    const result = matchSlugToTemplates('best-cv-maker-examples', patterns, wordPools)
    expect(result).not.toBeNull()
    expect(result!.template).toBe('$(adjective)-$(resume)-$(verber)-$(contentWord)')
  })

  it('prefers more specific (more literals) template on ambiguity', () => {
    const result = matchSlugToTemplates('how-to-build-a-resume', patterns, wordPools)
    expect(result!.template).toBe('how-to-$(verb)-a-$(resume)')
  })

  it('returns null for non-matching slug', () => {
    expect(matchSlugToTemplates('completely-invalid', patterns, wordPools)).toBeNull()
  })

  it('returns null for empty slug', () => {
    expect(matchSlugToTemplates('', patterns, wordPools)).toBeNull()
  })
})

// --- buildTemplateWordPools / buildCanonicalWordPools ---

import type {
  SuffixWordEntry,
  SuffixWordsData,
} from '@/globals/SuffixVariations/queries/suffixWordPools'

import {
  buildCanonicalWordPools,
  buildTemplateWordPools,
} from '@/globals/SuffixVariations/queries/suffixWordPools'

const e = (value: string, isCanonical = false): SuffixWordEntry => ({ value, isCanonical })

const suffixData: SuffixWordsData = {
  resumeWords: [e('resume', true), e('cv')],
  adjectives: [e('free', true), e('best')],
  builders: [e('builder', true), e('maker')],
  verbs: [e('build', true), e('make')],
  contentWords: [e('templates', true), e('examples')],
  canonicalStrategy: 'rel-canonical',
}

describe('buildTemplateWordPools', () => {
  it('maps SuffixWordsData to TemplateWordPools', () => {
    const pools = buildTemplateWordPools(suffixData)
    expect(pools.resume).toEqual(['resume', 'cv'])
    expect(pools.verb).toEqual(['build', 'make'])
    expect(pools.verber).toEqual(['builder', 'maker'])
    expect(pools.adjective).toEqual(['free', 'best'])
    expect(pools.contentWord).toEqual(['templates', 'examples'])
  })
})

describe('buildCanonicalWordPools', () => {
  it('returns pools with only canonical words', () => {
    const pools = buildCanonicalWordPools(suffixData)
    expect(pools.resume).toEqual(['resume'])
    expect(pools.verb).toEqual(['build'])
    expect(pools.verber).toEqual(['builder'])
    expect(pools.adjective).toEqual(['free'])
    expect(pools.contentWord).toEqual(['templates'])
  })

  it('returns empty arrays when no canonical is set', () => {
    const noCanonical: SuffixWordsData = {
      resumeWords: [e('resume'), e('cv')],
      adjectives: [e('free'), e('best')],
      builders: [e('builder'), e('maker')],
      verbs: [e('build'), e('make')],
      contentWords: [e('templates'), e('examples')],
      canonicalStrategy: 'rel-canonical',
    }
    const pools = buildCanonicalWordPools(noCanonical)
    expect(pools.resume).toEqual([])
    expect(pools.verb).toEqual([])
  })
})
