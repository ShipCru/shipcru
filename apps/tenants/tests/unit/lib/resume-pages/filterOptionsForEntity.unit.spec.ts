import { describe, it, expect } from 'vitest'

import { filterOptionsForEntity } from '@/lib/resume-pages/filterOptionsForEntity'

describe('filterOptionsForEntity', () => {
  it('returns all options when entity has skills', () => {
    const options = [
      { text: 'Build your {skill1} resume', weight: 1 },
      { text: 'Create a great resume', weight: 1 },
    ]
    const result = filterOptionsForEntity(options, true)
    expect(result).toEqual(options)
  })

  it('filters out options containing {skill1} when entity has no skills', () => {
    const options = [
      { text: 'Build your {skill1} resume', weight: 1 },
      { text: 'Create a great resume', weight: 2 },
    ]
    const result = filterOptionsForEntity(options, false)
    expect(result).toHaveLength(1)
    expect(result[0].text).toBe('Create a great resume')
    expect(result[0].weight).toBe(2)
  })

  it('filters out options containing {skill2} when entity has no skills', () => {
    const options = [
      { text: 'Showcase your {skill2} expertise', weight: 1 },
      { text: 'Build a professional resume', weight: 1 },
    ]
    const result = filterOptionsForEntity(options, false)
    expect(result).toHaveLength(1)
    expect(result[0].text).toBe('Build a professional resume')
  })

  it('filters out options with both {skill1} and {skill2}', () => {
    const options = [
      { text: '{skill1} and {skill2} experts', weight: 1 },
      { text: 'Professional resume builder', weight: 1 },
    ]
    const result = filterOptionsForEntity(options, false)
    expect(result).toHaveLength(1)
    expect(result[0].text).toBe('Professional resume builder')
  })

  it('falls back to stripped first option when ALL options contain skill refs', () => {
    const options = [
      { text: '{skill1} professionals: build your career', weight: 3 },
      { text: 'Showcase your {skill2} expertise', weight: 2 },
    ]
    const result = filterOptionsForEntity(options, false)
    expect(result).toHaveLength(1)
    expect(result[0].text).toBe('professionals: build your career')
    expect(result[0].weight).toBe(1)
  })

  it('strips {skill1} and collapses whitespace in fallback', () => {
    const options = [
      { text: 'Build  {skill1}  resume  today', weight: 1 },
    ]
    const result = filterOptionsForEntity(options, false)
    expect(result).toHaveLength(1)
    expect(result[0].text).toBe('Build resume today')
  })

  it('strips {skill2} in fallback too', () => {
    const options = [
      { text: 'For {skill1} and {skill2} experts', weight: 1 },
    ]
    const result = filterOptionsForEntity(options, false)
    expect(result).toHaveLength(1)
    expect(result[0].text).toBe('For and experts')
  })

  it('returns all options unchanged when no options contain skill refs and entity has no skills', () => {
    const options = [
      { text: 'Create a resume', weight: 1 },
      { text: 'Build your career', weight: 2 },
    ]
    const result = filterOptionsForEntity(options, false)
    expect(result).toEqual(options)
  })
})
