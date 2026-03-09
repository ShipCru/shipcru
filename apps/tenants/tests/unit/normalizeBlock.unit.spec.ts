import { describe, expect, it } from 'vitest'

import { normalizeBlock } from '@/lib/resume-pages/normalizeBlock'

describe('normalizeBlock', () => {
  it('maps blockType, sectionId, and sectionGroup from block data', () => {
    const block = {
      blockType: 'testimonials',
      sectionId: 'testimonials',
      sectionGroup: 'test',
      heading: { mode: 'fixed', fixedText: 'Our reviews' },
      description: { mode: 'fixed', fixedText: 'Read our reviews' },
      id: 'block-123',
    }
    const result = normalizeBlock(block)
    expect(result.blockType).toBe('testimonials')
    expect(result.sectionId).toBe('testimonials')
    expect(result.sectionGroup).toBe('test')
  })

  it('sets hidden to false and locked to false by default', () => {
    const block = {
      blockType: 'metrics',
      sectionId: 'metrics',
      sectionGroup: 'before',
      heading: { mode: 'fixed', fixedText: 'Stats' },
      id: 'block-456',
    }
    const result = normalizeBlock(block)
    expect(result.hidden).toBe(false)
    expect(result.locked).toBe(false)
  })

  it('puts all non-meta fields into the fields record', () => {
    const block = {
      blockType: 'blog',
      sectionId: 'blog',
      sectionGroup: 'after',
      heading: { mode: 'fixed', fixedText: 'Blog' },
      description: { mode: 'fixed', fixedText: 'Latest posts' },
      formPlaceholder: 'Enter email',
      id: 'block-789',
    }
    const result = normalizeBlock(block)
    expect(result.fields.heading).toEqual({ mode: 'fixed', fixedText: 'Blog' })
    expect(result.fields.description).toEqual({ mode: 'fixed', fixedText: 'Latest posts' })
    expect(result.fields.formPlaceholder).toBe('Enter email')
  })

  it('excludes blockType, sectionId, sectionGroup, and id from fields', () => {
    const block = {
      blockType: 'testimonials',
      sectionId: 'testimonials',
      sectionGroup: 'test',
      id: 'block-123',
      heading: 'Hello',
    }
    const result = normalizeBlock(block)
    expect(result.fields).not.toHaveProperty('blockType')
    expect(result.fields).not.toHaveProperty('sectionId')
    expect(result.fields).not.toHaveProperty('sectionGroup')
    expect(result.fields).not.toHaveProperty('id')
    expect(result.fields).toHaveProperty('heading')
  })

  it('defaults sectionGroup to "test" when not provided', () => {
    const block = {
      blockType: 'testimonials',
      sectionId: 'testimonials',
      heading: 'Hello',
      id: 'x',
    }
    const result = normalizeBlock(block)
    expect(result.sectionGroup).toBe('test')
  })

  it('defaults sectionId to blockType when not provided', () => {
    const block = {
      blockType: 'testimonials',
      heading: 'Hello',
      id: 'x',
    }
    const result = normalizeBlock(block)
    expect(result.sectionId).toBe('testimonials')
  })
})
