export function matchKeywordPattern(pattern: string, slug: string): boolean {
  if (!pattern || !slug) return false
  const p = pattern.toLowerCase()
  const s = slug.toLowerCase()
  const parts = p.split('*')

  if (parts.length === 1) return p === s

  let pos = 0
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (part === '') continue
    const idx = s.indexOf(part, pos)
    if (idx === -1) return false
    if (i === 0 && idx !== 0) return false
    pos = idx + part.length
  }

  const lastPart = parts[parts.length - 1]
  if (lastPart !== '' && !s.endsWith(lastPart)) return false

  return true
}

export function keywordPatternSpecificity(pattern: string): number {
  if (!pattern) return -1
  if (pattern === '*') return 0
  if (pattern.includes('*')) return 1
  return 2
}
