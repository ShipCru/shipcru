export function levenshtein(a: string, b: string): number {
  const matrix: number[][] = []
  for (let i = 0; i <= a.length; i++) matrix[i] = [i]
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      )
    }
  }
  return matrix[a.length][b.length]
}

export function suggestFieldName(input: string, validNames: string[]): string | null {
  let best: string | null = null
  let bestDistance = Infinity
  for (const name of validNames) {
    const d = levenshtein(input.toLowerCase(), name.toLowerCase())
    if (d < bestDistance && d <= 3) {
      bestDistance = d
      best = name
    }
  }
  return best
}
