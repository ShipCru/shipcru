import type { TemplateVariableName, TemplateWordPools } from './templatePatterns'

export type { TemplateWordPools }

const VARIABLE_PATTERN = /\$\(([^)]+)\)/

export function generateTemplateCombinations(
  patterns: string[],
  wordPools: TemplateWordPools,
): string[] {
  if (patterns.length === 0) return []

  const seen = new Set<string>()
  const slugs: string[] = []

  for (const pattern of patterns) {
    const varNames: TemplateVariableName[] = []
    let match: RegExpExecArray | null
    const re = new RegExp(VARIABLE_PATTERN.source, 'g')
    while ((match = re.exec(pattern)) !== null) {
      varNames.push(match[1] as TemplateVariableName)
    }

    if (varNames.length === 0) continue

    const wordArrays = varNames.map((v) => wordPools[v] ?? [])
    if (wordArrays.some((arr) => arr.length === 0)) continue

    const combos = cartesian(wordArrays)

    for (const combo of combos) {
      let idx = 0
      const slug = pattern.replace(new RegExp(VARIABLE_PATTERN.source, 'g'), () => combo[idx++])

      if (!seen.has(slug)) {
        seen.add(slug)
        slugs.push(slug)
      }
    }
  }

  return slugs
}

function cartesian(arrays: string[][]): string[][] {
  if (arrays.length === 0) return [[]]
  return arrays.reduce<string[][]>(
    (acc, arr) => acc.flatMap((combo) => arr.map((word) => [...combo, word])),
    [[]],
  )
}
