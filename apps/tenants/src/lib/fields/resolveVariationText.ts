/**
 * Resolves a variationField value to a plain text string.
 *
 * variationField stores data as `{ mode, fixedText, variationSet }`.
 * This helper extracts the fixed text for rendering. When the variation
 * system is fully wired up, this is where set-based resolution will live.
 */
export function resolveVariationText(
  field: string | { fixedText?: string | null; mode?: string | null } | null | undefined,
  fallback: string,
): string {
  if (typeof field === 'string') return field
  if (field && typeof field === 'object') return field.fixedText ?? fallback
  return fallback
}
