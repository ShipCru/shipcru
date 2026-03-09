import type { OrderSectionsInput, SectionConfig } from './types'

import seedrandom from 'seedrandom'

/**
 * DJB2 hash function. Fast, deterministic, good distribution.
 * Converts a string to a positive 32-bit integer.
 */
export function hashString(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i)
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

/**
 * Fisher-Yates shuffle using a seeded RNG for deterministic results.
 * Does NOT mutate the input array -- returns a new shuffled copy.
 */
function seededShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items]
  const rng = seedrandom(seed.toString())
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Orders sections into their final rendering sequence:
 * 1. "before" group (preserved original order)
 * 2. "test" group (deterministically shuffled based on baseSlug)
 * 3. "after" group (preserved original order)
 *
 * Key properties:
 * - Deterministic: same baseSlug always produces the same order
 * - Tenant-agnostic: different tenants get the same ordering for the same slug
 * - Suffix-agnostic: different URL suffixes for the same job title get the same ordering
 */
export function orderSections(input: OrderSectionsInput): SectionConfig[] {
  const { sections, baseSlug } = input

  const before: SectionConfig[] = []
  const test: SectionConfig[] = []
  const after: SectionConfig[] = []

  for (const section of sections) {
    switch (section.sectionGroup) {
      case 'before':
        before.push(section)
        break
      case 'after':
        after.push(section)
        break
      case 'test':
      default:
        test.push(section)
        break
    }
  }

  const seed = hashString(baseSlug)
  const shuffledTest = seededShuffle(test, seed)

  return [...before, ...shuffledTest, ...after]
}
