import type { SuffixWordLists } from '@/lib/resume-pages/types'

import { describe, expect, it } from 'vitest'

import { parseResumeUrl } from '@/lib/resume-pages/parseResumeUrl'

const suffixWords: SuffixWordLists = {
  adjectives: ['best', 'top', 'professional'],
  builders: ['creator', 'builder', 'maker', 'generator', 'help'],
  contentWords: ['content', 'examples', 'tips'],
}

describe('parseResumeUrl', () => {
  describe('industry-only pages (1 segment)', () => {
    it('parses a simple industry slug', () => {
      const result = parseResumeUrl('/resumes/advertising', suffixWords)
      expect(result).toEqual({
        type: 'industry',
        industrySlug: 'advertising',
        fullSlug: 'advertising',
      })
    })

    it('parses industry slug with trailing slash', () => {
      const result = parseResumeUrl('/resumes/advertising/', suffixWords)
      expect(result).toEqual({
        type: 'industry',
        industrySlug: 'advertising',
        fullSlug: 'advertising',
      })
    })

    it('parses multi-word industry slug', () => {
      const result = parseResumeUrl('/resumes/information-technology', suffixWords)
      expect(result).toEqual({
        type: 'industry',
        industrySlug: 'information-technology',
        fullSlug: 'information-technology',
      })
    })
  })

  describe('job-title pages (2 segments)', () => {
    it('parses a full job title URL with suffix', () => {
      const result = parseResumeUrl(
        '/resumes/advertising/advertising-account-manager-best-resume-creator-content',
        suffixWords,
      )
      expect(result).toEqual({
        type: 'job-title',
        industrySlug: 'advertising',
        jobTitleSlug: 'advertising-account-manager',
        adjective: 'best',
        builder: 'creator',
        content: 'content',
        contentSeed: 'advertising-account-manager-best-resume-creator-content',
        fullSlug: 'advertising/advertising-account-manager-best-resume-creator-content',
      })
    })

    it('parses a single-word job title slug', () => {
      const result = parseResumeUrl(
        '/resumes/tech/engineer-top-resume-builder-examples',
        suffixWords,
      )
      expect(result).toEqual({
        type: 'job-title',
        industrySlug: 'tech',
        jobTitleSlug: 'engineer',
        adjective: 'top',
        builder: 'builder',
        content: 'examples',
        contentSeed: 'engineer-top-resume-builder-examples',
        fullSlug: 'tech/engineer-top-resume-builder-examples',
      })
    })

    it('handles job title containing the word "resume" safely', () => {
      // The scan-from-right approach should not be confused by "resume" in the job title
      const result = parseResumeUrl(
        '/resumes/writing/resume-writer-professional-resume-maker-tips',
        suffixWords,
      )
      expect(result).toEqual({
        type: 'job-title',
        industrySlug: 'writing',
        jobTitleSlug: 'resume-writer',
        adjective: 'professional',
        builder: 'maker',
        content: 'tips',
        contentSeed: 'resume-writer-professional-resume-maker-tips',
        fullSlug: 'writing/resume-writer-professional-resume-maker-tips',
      })
    })
  })

  describe('invalid URLs', () => {
    it('returns null for empty path', () => {
      expect(parseResumeUrl('/resumes/', suffixWords)).toBeNull()
    })

    it('returns null for bare /resumes', () => {
      expect(parseResumeUrl('/resumes', suffixWords)).toBeNull()
    })

    it('returns null for too many segments', () => {
      expect(parseResumeUrl('/resumes/a/b/c', suffixWords)).toBeNull()
    })

    it('returns null when suffix has invalid adjective', () => {
      const result = parseResumeUrl(
        '/resumes/tech/engineer-INVALID-resume-creator-content',
        suffixWords,
      )
      expect(result).toBeNull()
    })

    it('returns null when suffix has invalid builder word', () => {
      const result = parseResumeUrl(
        '/resumes/tech/engineer-best-resume-INVALID-content',
        suffixWords,
      )
      expect(result).toBeNull()
    })

    it('returns null when suffix has invalid content word', () => {
      const result = parseResumeUrl(
        '/resumes/tech/engineer-best-resume-creator-INVALID',
        suffixWords,
      )
      expect(result).toBeNull()
    })

    it('returns null when "resume" literal is missing', () => {
      const result = parseResumeUrl('/resumes/tech/engineer-best-cv-creator-content', suffixWords)
      expect(result).toBeNull()
    })

    it('returns null when second segment is too short (fewer than 5 hyphen parts)', () => {
      const result = parseResumeUrl('/resumes/tech/best-resume-creator-content', suffixWords)
      // Only 4 parts for suffix, 0 for job title = invalid
      expect(result).toBeNull()
    })
  })
})
