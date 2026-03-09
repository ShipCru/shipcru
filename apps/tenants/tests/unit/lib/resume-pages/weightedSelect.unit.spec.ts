import { describe, it, expect } from 'vitest'
import seedrandom from 'seedrandom'

import { weightedSelect } from '@/lib/resume-pages/weightedSelect'

describe('weightedSelect', () => {
  it('returns the only option when given a single option', () => {
    const rng = seedrandom('any-seed')
    const result = weightedSelect([{ text: 'Only option', weight: 1 }], rng)
    expect(result).toBe('Only option')
  })

  it('is deterministic: same seed produces same selection', () => {
    const options = [
      { text: 'Option A', weight: 1 },
      { text: 'Option B', weight: 2 },
      { text: 'Option C', weight: 1 },
    ]

    const result1 = weightedSelect(options, seedrandom('test-seed'))
    const result2 = weightedSelect(options, seedrandom('test-seed'))

    expect(result1).toBe(result2)
  })

  it('different seeds can produce different selections', () => {
    const options = [
      { text: 'Option A', weight: 1 },
      { text: 'Option B', weight: 1 },
      { text: 'Option C', weight: 1 },
      { text: 'Option D', weight: 1 },
      { text: 'Option E', weight: 1 },
    ]

    // With 5 equal-weight options and many seeds, we should get variation
    const results = new Set<string>()
    for (let i = 0; i < 50; i++) {
      results.add(weightedSelect(options, seedrandom(`seed-${i}`)))
    }
    expect(results.size).toBeGreaterThan(1)
  })

  it('respects weights: higher weight options are selected more often', () => {
    const options = [
      { text: 'Rare', weight: 1 },
      { text: 'Common', weight: 99 },
    ]

    let commonCount = 0
    for (let i = 0; i < 100; i++) {
      const result = weightedSelect(options, seedrandom(`weight-test-${i}`))
      if (result === 'Common') commonCount++
    }

    // With 99:1 ratio, "Common" should appear in vast majority
    expect(commonCount).toBeGreaterThan(80)
  })

  it('handles zero total weight gracefully by returning last option', () => {
    const options = [
      { text: 'A', weight: 0 },
      { text: 'B', weight: 0 },
    ]
    const rng = seedrandom('zero-weight')
    const result = weightedSelect(options, rng)
    expect(result).toBe('B')
  })
})
