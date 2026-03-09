import type { EntityData, SectionConfig } from '@/lib/resume-pages/types'

import { describe, expect, it } from 'vitest'

import { filterByDataDependencies } from '@/lib/resume-pages/mergeTemplate'

function makeSectionConfig(overrides: Partial<SectionConfig> = {}): SectionConfig {
  return {
    blockType: 'testimonials',
    sectionId: 'testimonials',
    sectionGroup: 'test',
    hidden: false,
    locked: false,
    fields: {},
    ...overrides,
  }
}

describe('filterByDataDependencies', () => {
  it('keeps sections with no data dependency', () => {
    const sections = [makeSectionConfig({ blockType: 'testimonials' })]
    const entity: EntityData = {}
    const result = filterByDataDependencies(sections, entity)
    expect(result).toHaveLength(1)
  })

  it('removes "top-skills" section when entity has no skills', () => {
    const sections = [makeSectionConfig({ blockType: 'top-skills', sectionId: 'top-skills' })]
    const entity: EntityData = { skills: [] }
    const result = filterByDataDependencies(sections, entity)
    expect(result).toHaveLength(0)
  })

  it('keeps "top-skills" section when entity has skills', () => {
    const sections = [makeSectionConfig({ blockType: 'top-skills', sectionId: 'top-skills' })]
    const entity: EntityData = { skills: ['JavaScript', 'TypeScript'] }
    const result = filterByDataDependencies(sections, entity)
    expect(result).toHaveLength(1)
  })

  it('removes "salary" section when entity has no salary data', () => {
    const sections = [makeSectionConfig({ blockType: 'salary', sectionId: 'salary' })]
    const entity: EntityData = { hasSalaryData: false }
    const result = filterByDataDependencies(sections, entity)
    expect(result).toHaveLength(0)
  })

  it('keeps "salary" section when entity has salary data', () => {
    const sections = [makeSectionConfig({ blockType: 'salary', sectionId: 'salary' })]
    const entity: EntityData = { hasSalaryData: true }
    const result = filterByDataDependencies(sections, entity)
    expect(result).toHaveLength(1)
  })

  it('removes "certifications" section when entity has no certifications', () => {
    const sections = [
      makeSectionConfig({ blockType: 'certifications', sectionId: 'certifications' }),
    ]
    const entity: EntityData = { hasCertifications: false }
    const result = filterByDataDependencies(sections, entity)
    expect(result).toHaveLength(0)
  })

  it('keeps "certifications" section when entity has certifications', () => {
    const sections = [
      makeSectionConfig({ blockType: 'certifications', sectionId: 'certifications' }),
    ]
    const entity: EntityData = { hasCertifications: true }
    const result = filterByDataDependencies(sections, entity)
    expect(result).toHaveLength(1)
  })

  it('filters multiple sections at once, keeping those that pass', () => {
    const sections = [
      makeSectionConfig({ blockType: 'testimonials', sectionId: 'testimonials' }),
      makeSectionConfig({ blockType: 'top-skills', sectionId: 'top-skills' }),
      makeSectionConfig({ blockType: 'salary', sectionId: 'salary' }),
      makeSectionConfig({ blockType: 'metrics', sectionId: 'metrics' }),
    ]
    const entity: EntityData = { skills: [], hasSalaryData: true }
    const result = filterByDataDependencies(sections, entity)
    // testimonials: no dependency -> kept
    // top-skills: needs skills, has none -> removed
    // salary: needs salaryData, has it -> kept
    // metrics: no dependency -> kept
    expect(result).toHaveLength(3)
    expect(result.map((s) => s.blockType)).toEqual(['testimonials', 'salary', 'metrics'])
  })
})
