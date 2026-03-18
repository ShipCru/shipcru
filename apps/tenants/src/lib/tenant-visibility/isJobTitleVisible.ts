function extractSlug(item: { slug: string } | number): string | null {
  if (typeof item === 'object' && 'slug' in item) return item.slug
  return null
}

interface JobTitleVisibilityInput {
  jobTitleMode?: string | null
  jobTitles?: Array<{ slug: string } | number> | null
  excludedJobTitles?: Array<{ slug: string } | number> | null
}

export function isJobTitleVisible(cfg: JobTitleVisibilityInput, jtSlug: string): boolean {
  if (!cfg.jobTitleMode || cfg.jobTitleMode === 'all-in-industries') return true

  if (cfg.jobTitleMode === 'specific') {
    return cfg.jobTitles?.some((jt) => extractSlug(jt) === jtSlug) ?? false
  }

  if (cfg.jobTitleMode === 'exclude-specific') {
    return !cfg.excludedJobTitles?.some((jt) => extractSlug(jt) === jtSlug)
  }

  return true
}
