import { describe, it, expect } from 'vitest'
import seedrandom from 'seedrandom'

/**
 * Pinning test for seedrandom determinism.
 *
 * These tests verify that the exact same seed always produces the exact same
 * sequence of floats. If seedrandom is accidentally upgraded to a version with
 * a different algorithm, these tests will fail immediately.
 *
 * The pinned values were captured from seedrandom at the version in our lockfile.
 * DO NOT update these values unless you intentionally change the seedrandom version
 * and accept that all existing variation selections may change.
 */
describe('seedrandom determinism pinning', () => {
  it('produces exact known floats for the canonical test seed', () => {
    const seed = 'resumebuilder.software-engineer-best-resume-creator-content.hero.title'
    const rng = seedrandom(seed)

    const float1 = rng()
    const float2 = rng()
    const float3 = rng()

    expect(float1).toBeCloseTo(0.9878347924233359, 15)
    expect(float2).toBeCloseTo(0.9209850233005387, 15)
    expect(float3).toBeCloseTo(0.8647437935533296, 15)
  })

  it('different seeds produce different first floats', () => {
    const rng1 = seedrandom('tenant-a.page-1.hero.title')
    const rng2 = seedrandom('tenant-b.page-1.hero.title')

    expect(rng1()).not.toBe(rng2())
  })

  it('same seed always produces identical sequence across multiple calls', () => {
    const seed = 'careercoach.advertising.hero.title'
    const sequence1: number[] = []
    const sequence2: number[] = []

    const rng1 = seedrandom(seed)
    const rng2 = seedrandom(seed)

    for (let i = 0; i < 10; i++) {
      sequence1.push(rng1())
      sequence2.push(rng2())
    }

    expect(sequence1).toEqual(sequence2)
  })
})
