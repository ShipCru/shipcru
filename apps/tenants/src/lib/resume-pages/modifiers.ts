export interface ParsedModifier {
  name: string
  arg?: string
}

export interface ParsedVariable {
  variable: string
  modifiers: ParsedModifier[]
}

/**
 * Parses a variable expression like "brand.title:nbsp:capitalize"
 * or "pageData.salary:formatCurrency{USD}" into variable + modifiers.
 */
export function parseVariableExpression(expr: string): ParsedVariable {
  if (!expr) return { variable: '', modifiers: [] }

  // Split on : but not inside {}
  const parts: string[] = []
  let current = ''
  let braceDepth = 0
  for (const char of expr) {
    if (char === '{') braceDepth++
    if (char === '}') braceDepth--
    if (char === ':' && braceDepth === 0) {
      parts.push(current)
      current = ''
    } else {
      current += char
    }
  }
  parts.push(current)

  const variable = parts[0]
  const modifiers: ParsedModifier[] = parts.slice(1).map((part) => {
    const braceIdx = part.indexOf('{')
    if (braceIdx !== -1 && part.endsWith('}')) {
      return { name: part.slice(0, braceIdx), arg: part.slice(braceIdx + 1, -1) }
    }
    return { name: part }
  })

  return { variable, modifiers }
}

type ModifierFn = (value: string, arg?: string) => string

const MODIFIER_REGISTRY: Record<string, ModifierFn> = {
  capitalize: (value) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : ''),
  nbsp: (value) => value.replace(/ /g, '\u00a0'),
  formatCurrency: (value, arg) => {
    const num = Number(value)
    if (Number.isNaN(num)) return value
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: arg || 'USD',
    }).format(num)
  },
}

/**
 * Applies a chain of modifiers to a string value, left to right.
 * Unknown modifiers are silently skipped.
 */
export function applyModifiers(value: string, modifiers: ParsedModifier[]): string {
  let result = value
  for (const mod of modifiers) {
    const fn = MODIFIER_REGISTRY[mod.name]
    if (fn) {
      result = fn(result, mod.arg)
    }
  }
  return result
}

/**
 * Resolves a dot-separated path against an object.
 * Returns the stringified value, or empty string if not found.
 */
export function resolveDotPath(obj: Record<string, unknown>, path: string): string {
  const parts = path.split('.')
  let current: unknown = obj
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return ''
    current = (current as Record<string, unknown>)[part]
  }
  return current != null ? String(current) : ''
}
