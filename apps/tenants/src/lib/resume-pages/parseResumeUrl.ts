import type { ParsedResumeUrl, SuffixWordLists } from './types'

/**
 * Builds the internal path for a job-title suffix page.
 * Inverse of the job-title branch in parseResumeUrl.
 */
export function buildJobTitleSuffixPath(
  tenantSlug: string,
  industrySlug: string,
  jobTitleSlug: string,
  suffix: { adjective: string; builder: string; contentWord: string },
): string {
  return `/${tenantSlug}/resumes/${industrySlug}/${jobTitleSlug}-${suffix.adjective}-resume-${suffix.builder}-${suffix.contentWord}`
}

/**
 * Parses a resume page URL path into structured data.
 *
 * URL structure: /resumes/:industrySlug or /resumes/:industrySlug/:jobTitleSlug-:adj-resume-:builder-:content
 *
 * Uses right-to-left scanning with known word lists to separate the job title slug
 * from the suffix pattern. This avoids ambiguity when job titles contain hyphens or
 * even the word "resume" (e.g., "resume-writer").
 *
 * @param path - The full URL path (e.g., "/resumes/advertising/account-manager-best-resume-creator-content")
 * @param suffixWords - The known suffix word lists (adjectives, builders, contentWords)
 * @returns Parsed URL data, or null if the URL is invalid
 */
export function parseResumeUrl(
  path: string,
  suffixWords: SuffixWordLists,
): ParsedResumeUrl | null {
  // Strip leading /resumes/ prefix
  const stripped = path.replace(/^\/resumes\/?/, '')
  const segments = stripped.split('/').filter(Boolean)

  if (segments.length === 0) return null

  // Industry-only page: /resumes/:industrySlug
  if (segments.length === 1) {
    return {
      type: 'industry',
      industrySlug: segments[0],
      fullSlug: segments[0],
    }
  }

  // Job title page: /resumes/:industrySlug/:fullJobSegment
  if (segments.length === 2) {
    const industrySlug = segments[0]
    const fullJobSegment = segments[1]
    const parts = fullJobSegment.split('-')

    // Minimum: "{jobTitle}-{adj}-resume-{builder}-{content}" = at least 5 parts
    if (parts.length < 5) return null

    // Scan from right: content, builder, "resume", adjective
    const contentWord = parts[parts.length - 1]
    const builderWord = parts[parts.length - 2]
    const resumeWord = parts[parts.length - 3]
    const adjective = parts[parts.length - 4]

    if (resumeWord !== 'resume') return null
    if (!suffixWords.contentWords.includes(contentWord)) return null
    if (!suffixWords.builders.includes(builderWord)) return null
    if (!suffixWords.adjectives.includes(adjective)) return null

    // Everything before the adjective is the job title slug
    const jobTitleSlug = parts.slice(0, parts.length - 4).join('-')
    if (!jobTitleSlug) return null

    return {
      type: 'job-title',
      industrySlug,
      jobTitleSlug,
      adjective,
      builder: builderWord,
      content: contentWord,
      contentSeed: fullJobSegment,
      fullSlug: `${industrySlug}/${fullJobSegment}`,
    }
  }

  // Too many segments
  return null
}
