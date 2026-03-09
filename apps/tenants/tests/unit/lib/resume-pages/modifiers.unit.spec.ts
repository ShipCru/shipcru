// tests/unit/lib/resume-pages/modifiers.unit.spec.ts
import { describe, expect, it } from 'vitest'

import {
  applyModifiers,
  parseVariableExpression,
  resolveDotPath,
} from '@/lib/resume-pages/modifiers'

describe('parseVariableExpression', () => {
  it('parses a simple variable with no modifiers', () => {
    const result = parseVariableExpression('brand.title')
    expect(result.variable).toBe('brand.title')
    expect(result.modifiers).toEqual([])
  })

  it('parses a variable with one modifier', () => {
    const result = parseVariableExpression('brand.title:nbsp')
    expect(result.variable).toBe('brand.title')
    expect(result.modifiers).toEqual([{ name: 'nbsp' }])
  })

  it('parses a variable with multiple modifiers', () => {
    const result = parseVariableExpression('pageData.industry.name:capitalizeFirstLetter:nbsp')
    expect(result.variable).toBe('pageData.industry.name')
    expect(result.modifiers).toEqual([{ name: 'capitalizeFirstLetter' }, { name: 'nbsp' }])
  })

  it('parses a parameterized modifier', () => {
    const result = parseVariableExpression('pageData.salary:formatCurrency{USD}')
    expect(result.variable).toBe('pageData.salary')
    expect(result.modifiers).toEqual([{ name: 'formatCurrency', arg: 'USD' }])
  })

  it('handles empty expression', () => {
    const result = parseVariableExpression('')
    expect(result.variable).toBe('')
    expect(result.modifiers).toEqual([])
  })
})

describe('applyModifiers', () => {
  it('capitalizeFirstLetter capitalizes the first letter', () => {
    const result = applyModifiers('healthcare', [{ name: 'capitalizeFirstLetter' }])
    expect(result).toBe('Healthcare')
  })

  it('capitalizeFirstLetter handles empty string', () => {
    expect(applyModifiers('', [{ name: 'capitalizeFirstLetter' }])).toBe('')
  })

  it('nbsp replaces spaces with non-breaking spaces', () => {
    const result = applyModifiers('Rocket Resume', [{ name: 'nbsp' }])
    expect(result).toBe('Rocket\u00a0Resume')
  })

  it('formatCurrency formats a number string as currency', () => {
    const result = applyModifiers('75000', [{ name: 'formatCurrency', arg: 'USD' }])
    expect(result).toBe('$75,000.00')
  })

  it('chains multiple modifiers left to right', () => {
    const result = applyModifiers('rocket resume', [
      { name: 'capitalizeFirstLetter' },
      { name: 'nbsp' },
    ])
    expect(result).toBe('Rocket\u00a0resume')
  })

  it('ignores unknown modifiers', () => {
    const result = applyModifiers('hello', [{ name: 'unknownMod' }])
    expect(result).toBe('hello')
  })
})

describe('resolveDotPath', () => {
  it('resolves a simple path', () => {
    expect(resolveDotPath({ name: 'Healthcare' }, 'name')).toBe('Healthcare')
  })

  it('resolves a nested path', () => {
    const obj = { industry: { name: 'Healthcare', slug: 'healthcare' } }
    expect(resolveDotPath(obj, 'industry.name')).toBe('Healthcare')
    expect(resolveDotPath(obj, 'industry.slug')).toBe('healthcare')
  })

  it('returns empty string for missing paths', () => {
    expect(resolveDotPath({ a: 1 }, 'b')).toBe('')
    expect(resolveDotPath({ a: { b: 1 } }, 'a.c')).toBe('')
  })

  it('stringifies non-string values', () => {
    expect(resolveDotPath({ count: 42 }, 'count')).toBe('42')
  })

  it('returns empty string for null/undefined values', () => {
    expect(resolveDotPath({ x: null }, 'x')).toBe('')
    expect(resolveDotPath({ x: undefined }, 'x')).toBe('')
  })
})
