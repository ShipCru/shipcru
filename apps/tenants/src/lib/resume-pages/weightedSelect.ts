import type { VariationOption } from './types'

/**
 * Selects one option from a weighted list using the provided RNG.
 *
 * Algorithm: Generate a random roll in [0, totalWeight), then iterate
 * options subtracting each weight. The first option that brings the
 * roll to <= 0 is selected. Falls back to the last option if
 * floating-point drift causes no selection (or all weights are 0).
 *
 * @param options - Array of {text, weight} objects. Must have at least one entry.
 * @param rng - A function returning a float in [0, 1). Typically from seedrandom.
 * @returns The selected option's text string.
 */
export function weightedSelect(
  options: VariationOption[],
  rng: () => number,
): string {
  const totalWeight = options.reduce((sum, opt) => sum + opt.weight, 0)
  let roll = rng() * totalWeight

  for (const option of options) {
    roll -= option.weight
    if (roll < 0) return option.text
  }

  // Fallback for floating-point edge cases or zero-weight options
  return options[options.length - 1].text
}
