/**
 * Suffix word lists extracted from the `suffix-variations` global.
 * Passed to the parser so it can validate suffix segments.
 */
export interface SuffixWordLists {
  adjectives: string[]
  builders: string[]
  contentWords: string[]
}

/**
 * Result of parsing a resume page URL path.
 */
export interface ParsedResumeUrl {
  /** Whether this is an industry-level or job-title-level page */
  type: 'industry' | 'job-title'
  /** The industry slug extracted from the first path segment */
  industrySlug: string
  /** The job title slug (everything before the suffix). Undefined for industry pages. */
  jobTitleSlug?: string
  /** The adjective suffix word (e.g., "best"). Undefined for industry pages. */
  adjective?: string
  /** The builder suffix word (e.g., "creator"). Undefined for industry pages. */
  builder?: string
  /** The content suffix word (e.g., "content"). Undefined for industry pages. */
  content?: string
  /** The full second path segment (job title + suffix). Undefined for industry pages. */
  contentSeed?: string
  /** The full path after /resumes/ (e.g., "advertising/account-manager-best-resume-creator-content") */
  fullSlug: string
}

/**
 * Context object for template variable substitution.
 */
export interface SubstitutionContext {
  adjective?: string
  builder?: string
  content?: string
  skills: string[]
  /** Seed string for deterministic skill selection (typically the contentSeed from parsed URL) */
  skillSeed: string
  industryName?: string
  jobTitleName?: string
}
