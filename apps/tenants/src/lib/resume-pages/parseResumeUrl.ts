import type { ParsedResumeUrl, SuffixWordLists } from './types'

/**
 * Builds the internal path for a job-title suffix page.
 * Inverse of the job-title branch in parseResumeUrl.
 */
export function buildJobTitleSuffixPath(
  tenantSlug: string,
  industrySlug: string,
  jobTitleSlug: string,
  suffix: { adjective: string; resumeWord?: string; builder: string; contentWord: string },
): string {
  const rw = suffix.resumeWord ?? 'resume'
  return `/${tenantSlug}/resumes/${industrySlug}/${jobTitleSlug}-${suffix.adjective}-${rw}-${suffix.builder}-${suffix.contentWord}`
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

    // Known resume words from the global config (fall back to ['resume'] for backwards compat)
    const resumeWords =
      suffixWords.resumeWords && suffixWords.resumeWords.length > 0
        ? suffixWords.resumeWords
        : ['resume']

    // Minimum: "{jobTitle}-{adj}-{resumeWord}-{builder}-{content}" = at least 5 parts
    if (parts.length < 5) return null

    // Scan from right: content, builder, then find a resume word, then adjective
    const contentWord = parts[parts.length - 1]
    const builderWord = parts[parts.length - 2]

    if (!suffixWords.contentWords.includes(contentWord)) return null
    if (!suffixWords.builders.includes(builderWord)) return null

    // Try to match a resume word at the position(s) before the builder
    // Resume words can be multi-word (e.g., "curriculum-vitae" = 2 parts)
    let matchedResumeWord: string | null = null
    let resumeWordPartCount = 0

    // Sort resume words longest first to match multi-word entries first
    const sortedResumeWords = [...resumeWords].sort((a, b) => b.length - a.length)

    for (const rw of sortedResumeWords) {
      const rwParts = rw.split('-')
      const startIdx = parts.length - 2 - rwParts.length
      if (startIdx < 1) continue // Need at least 1 part before for adjective

      const candidate = parts.slice(startIdx, startIdx + rwParts.length).join('-')
      if (candidate === rw) {
        matchedResumeWord = rw
        resumeWordPartCount = rwParts.length
        break
      }
    }

    if (!matchedResumeWord) return null

    // Adjective is the part just before the resume word
    const adjIdx = parts.length - 2 - resumeWordPartCount - 1
    if (adjIdx < 0) return null
    const adjective = parts[adjIdx]
    if (!suffixWords.adjectives.includes(adjective)) return null

    // Everything before the adjective is the job title slug
    const jobTitleSlug = parts.slice(0, adjIdx).join('-')
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
