export function jobTitleFullText(doc: Record<string, any>): string {
  const parts: string[] = []

  if (doc.name) parts.push(doc.name)

  // Include industry names for richer semantic context
  if (Array.isArray(doc.industries)) {
    for (const industry of doc.industries) {
      const name = typeof industry === 'object' ? industry?.name : null
      if (name) parts.push(name)
    }
  }

  return parts.join(' — ')
}

export function resumeContentFullText(doc: Record<string, any>): string {
  const parts: string[] = []

  if (doc.name) parts.push(doc.name)
  if (doc.type) parts.push(doc.type)
  if (doc.description) parts.push(doc.description)

  return parts.join(' — ')
}
