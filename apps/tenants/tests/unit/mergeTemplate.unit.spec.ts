import type {
  ResolvedTemplateOverride,
  ResolvedTemplateOverrideBase,
  SectionConfig,
} from '@/lib/resume-pages/types'

import { describe, expect, it } from 'vitest'

import { applyOverrides } from '@/lib/resume-pages/mergeTemplate'

function makeSectionConfig(overrides: Partial<SectionConfig> = {}): SectionConfig {
  return {
    blockType: 'testimonials',
    sectionId: 'testimonials',
    sectionGroup: 'test',
    hidden: false,
    locked: false,
    fields: { heading: 'Default heading', description: 'Default desc' },
    ...overrides,
  }
}

function makeOverride(
  overrides: Partial<ResolvedTemplateOverrideBase> & {
    sectionOverrides: ResolvedTemplateOverride['sectionOverrides']
    targetType?: 'industry-category' | 'industry' | 'job-title'
    targetEntity?: string | number | null
  },
): ResolvedTemplateOverride {
  return {
    id: '1',
    name: 'Test Override',
    tenant: null,
    targetType: 'industry',
    targetEntity: 'ind-1',
    ...overrides,
  }
}

describe('applyOverrides', () => {
  it('returns sections unchanged when no overrides are provided', () => {
    const sections = [makeSectionConfig()]
    const result = applyOverrides(sections, [])
    expect(result).toEqual(sections)
  })

  it('does not mutate the input sections array', () => {
    const sections = [makeSectionConfig()]
    const original = JSON.parse(JSON.stringify(sections))
    applyOverrides(sections, [
      makeOverride({
        sectionOverrides: [
          {
            sectionBlockType: 'testimonials',
            action: 'override-props',
            fieldsToOverride: ['heading'],
            overrideFields: { heading: 'New heading' },
          },
        ],
      }),
    ])
    expect(sections).toEqual(original)
  })

  it('applies field overrides from fieldsToOverride list', () => {
    const sections = [makeSectionConfig()]
    const result = applyOverrides(sections, [
      makeOverride({
        sectionOverrides: [
          {
            sectionBlockType: 'testimonials',
            action: 'override-props',
            fieldsToOverride: ['heading'],
            overrideFields: { heading: 'Overridden heading' },
          },
        ],
      }),
    ])
    expect(result[0].fields.heading).toBe('Overridden heading')
    // description should remain unchanged since it was not in fieldsToOverride
    expect(result[0].fields.description).toBe('Default desc')
  })

  it('matches by sectionId first, then falls back to blockType', () => {
    const sections = [
      makeSectionConfig({ sectionId: 'testimonials-custom', blockType: 'testimonials' }),
    ]
    const result = applyOverrides(sections, [
      makeOverride({
        sectionOverrides: [
          {
            sectionBlockType: 'testimonials-custom',
            action: 'override-props',
            fieldsToOverride: ['heading'],
            overrideFields: { heading: 'Matched by sectionId' },
          },
        ],
      }),
    ])
    expect(result[0].fields.heading).toBe('Matched by sectionId')
  })

  it('falls back to blockType when sectionId does not match', () => {
    const sections = [makeSectionConfig({ sectionId: 'testimonials', blockType: 'testimonials' })]
    const result = applyOverrides(sections, [
      makeOverride({
        sectionOverrides: [
          {
            sectionBlockType: 'testimonials',
            action: 'override-props',
            fieldsToOverride: ['heading'],
            overrideFields: { heading: 'Matched by blockType' },
          },
        ],
      }),
    ])
    expect(result[0].fields.heading).toBe('Matched by blockType')
  })

  it('hides sections when action is "hide"', () => {
    const sections = [
      makeSectionConfig({ sectionId: 'testimonials' }),
      makeSectionConfig({ sectionId: 'metrics', blockType: 'metrics' }),
    ]
    const result = applyOverrides(sections, [
      makeOverride({
        sectionOverrides: [
          {
            sectionBlockType: 'testimonials',
            action: 'hide',
            overrideFields: {},
          },
        ],
      }),
    ])
    expect(result).toHaveLength(1)
    expect(result[0].sectionId).toBe('metrics')
  })

  it('sets locked flag and prevents tenant overrides on locked sections', () => {
    const sections = [makeSectionConfig()]

    // First override (global): locks the section
    const globalOverride = makeOverride({
      id: '1',
      tenant: null,
      sectionOverrides: [
        {
          sectionBlockType: 'testimonials',
          action: 'override-props',
          locked: true,
          fieldsToOverride: ['heading'],
          overrideFields: { heading: 'Global locked heading' },
        },
      ],
    })

    // Second override (tenant): tries to modify the locked section
    const tenantOverride = makeOverride({
      id: '2',
      tenant: 'tenant-1',
      sectionOverrides: [
        {
          sectionBlockType: 'testimonials',
          action: 'override-props',
          fieldsToOverride: ['heading'],
          overrideFields: { heading: 'Tenant attempt' },
        },
      ],
    })

    const result = applyOverrides(sections, [globalOverride, tenantOverride])
    expect(result[0].fields.heading).toBe('Global locked heading')
    expect(result[0].locked).toBe(true)
  })

  it('allows global overrides to modify locked sections from earlier global overrides', () => {
    const sections = [makeSectionConfig()]

    const firstGlobal = makeOverride({
      id: '1',
      tenant: null,
      sectionOverrides: [
        {
          sectionBlockType: 'testimonials',
          action: 'override-props',
          locked: true,
          fieldsToOverride: ['heading'],
          overrideFields: { heading: 'First global' },
        },
      ],
    })

    const secondGlobal = makeOverride({
      id: '2',
      tenant: null,
      sectionOverrides: [
        {
          sectionBlockType: 'testimonials',
          action: 'override-props',
          fieldsToOverride: ['heading'],
          overrideFields: { heading: 'Second global wins' },
        },
      ],
    })

    const result = applyOverrides(sections, [firstGlobal, secondGlobal])
    expect(result[0].fields.heading).toBe('Second global wins')
  })

  it('changes sectionGroup when specified in override', () => {
    const sections = [makeSectionConfig({ sectionGroup: 'test' })]
    const result = applyOverrides(sections, [
      makeOverride({
        sectionOverrides: [
          {
            sectionBlockType: 'testimonials',
            action: 'override-props',
            sectionGroup: 'before',
            fieldsToOverride: [],
            overrideFields: {},
          },
        ],
      }),
    ])
    expect(result[0].sectionGroup).toBe('before')
  })

  it('skips override entries that match no section', () => {
    const sections = [makeSectionConfig({ sectionId: 'testimonials' })]
    const result = applyOverrides(sections, [
      makeOverride({
        sectionOverrides: [
          {
            sectionBlockType: 'nonexistent-section',
            action: 'hide',
            overrideFields: {},
          },
        ],
      }),
    ])
    expect(result).toHaveLength(1)
    expect(result[0].sectionId).toBe('testimonials')
  })

  it('applies multiple overrides in order (last wins)', () => {
    const sections = [makeSectionConfig()]
    const result = applyOverrides(sections, [
      makeOverride({
        id: '1',
        sectionOverrides: [
          {
            sectionBlockType: 'testimonials',
            action: 'override-props',
            fieldsToOverride: ['heading'],
            overrideFields: { heading: 'First' },
          },
        ],
      }),
      makeOverride({
        id: '2',
        sectionOverrides: [
          {
            sectionBlockType: 'testimonials',
            action: 'override-props',
            fieldsToOverride: ['heading'],
            overrideFields: { heading: 'Second wins' },
          },
        ],
      }),
    ])
    expect(result[0].fields.heading).toBe('Second wins')
  })
})
