/**
 * Maps targetType select values to their polymorphic relationTo collection slugs.
 * Used by template-overrides filterOptions and buildOverrideChain queries.
 */
export const TARGET_TYPE_TO_RELATION: Record<string, string> = {
  'industry-category': 'industry-categories',
  industry: 'industries',
  'job-title': 'job-titles',
}

/** A single option within a variation set */
export interface VariationOption {
  text: string
  weight: number
}

/** A named pool of text options that the seed-based resolver selects from */
export interface VariationSet {
  assignmentKey: string
  options: VariationOption[]
}

/**
 * The value shape of a `variationField` group (from src/lib/fields/variationField.ts).
 * Each field using `variationField(name, label)` produces this shape in data.
 */
export interface VariationFieldValue {
  mode: 'fixed' | 'variation'
  fixedText?: string | null
  /** ID or populated relationship to content-variations collection */
  variationSet?: string | null
}

/** Input to the resolveVariations function */
export interface VariationInput {
  /** Tenant's slug -- first segment of the seed */
  tenantSlug: string
  /** Full content seed (e.g., the third URL path segment for job-title pages, or industry slug) */
  contentSeed: string
  /** Pre-loaded variation sets keyed by assignmentKey (and also by stringified doc ID) */
  variationSets: Record<string, VariationSet>
  /** Skills associated with the entity (empty array for industry pages) */
  entitySkills: string[]
}

/**
 * Suffix word lists extracted from the `suffix-variations` global.
 * Passed to the parser so it can validate suffix segments.
 */
export interface SuffixWordLists {
  resumeWords: string[]
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

import type {
  AdjectiveFormsConfig,
  ContentWordFormsConfig,
  ResumeWordsConfig,
  VerbFormsConfig,
} from './resolveWordForms'

/**
 * Context object for template variable substitution.
 */
export interface SubstitutionContext {
  // Existing fields (unchanged):
  adjective?: string
  builder?: string
  content?: string
  skills: string[]
  /** Seed string for deterministic skill selection (typically the contentSeed from parsed URL) */
  skillSeed: string
  industryName?: string
  jobTitleName?: string
  // New fields:
  brandTitle: string
  resumeWords: ResumeWordsConfig
  verbForms: VerbFormsConfig
  adjectiveForms: AdjectiveFormsConfig
  contentWordForms: ContentWordFormsConfig
  pageTerms: { pageTerm: string; iSlug: string; jSlug: string }
  pageData: Record<string, unknown>
}

// Re-export for convenience
export type { AdjectiveFormsConfig, ContentWordFormsConfig, ResumeWordsConfig, VerbFormsConfig }

/**
 * Normalized representation of a single section (block) in the template.
 * Used as the unit of data flowing through the merge and ordering pipeline.
 */
export interface SectionConfig {
  /** The Payload block slug, e.g. "testimonials", "metrics", "blog" */
  blockType: string
  /**
   * Unique identifier for this section instance.
   * Auto-generated from blockType (e.g., "testimonials", "testimonials-2").
   * Used as the primary merge key when applying overrides.
   */
  sectionId: string
  /** Controls ordering: "before" sections are fixed at top, "test" are shuffled, "after" are fixed at bottom */
  sectionGroup: 'before' | 'test' | 'after'
  /** When true, this section is removed from output after merge */
  hidden: boolean
  /**
   * When true, tenant-level overrides cannot modify this section.
   * Set by global (non-tenant) override docs.
   */
  locked: boolean
  /** Resolved field values for this section (heading, description, etc.) */
  fields: Record<string, unknown>
}

/**
 * A single section override entry within a ResolvedTemplateOverride doc.
 * Matches the `sectionOverrides` array item shape from the ResolvedTemplateOverrides collection.
 */
export interface SectionOverrideEntry {
  /** Matches against SectionConfig.sectionId (fallback: blockType) */
  sectionBlockType: string
  /** "hide" removes the section; "override-props" modifies its fields */
  action: 'hide' | 'override-props'
  /** If true, prevents downstream tenant overrides from modifying this section */
  locked?: boolean
  /** Change the section's ordering group */
  sectionGroup?: 'before' | 'test' | 'after'
  /** List of field names that should be overridden (only these are applied) */
  fieldsToOverride?: string[]
  /** The override field values, keyed by field name */
  overrideFields: Record<string, unknown>
}

/**
 * Represents a single template-override document from the ResolvedTemplateOverrides collection.
 * The merge function receives an ordered array of these.
 */
export interface ResolvedTemplateOverride {
  id: string | number
  name: string
  /** When non-null, this is a tenant-scoped override */
  tenant: string | number | null
  targetType: 'industry-category' | 'industry' | 'job-title' | null
  targetEntity: string | number | null
  /** The section-level overrides within this doc */
  sectionOverrides: SectionOverrideEntry[]
}

/**
 * Entity data used for data-dependency filtering.
 * Populated by the caller from the actual entity record.
 */
export interface EntityData {
  skills?: string[]
  hasSalaryData?: boolean
  hasCertifications?: boolean
}

/**
 * Input for the section ordering function.
 */
export interface OrderSectionsInput {
  /** Post-merge, post-data-dependency-filter sections */
  sections: SectionConfig[]
  /** Job title slug (no suffix) or industry slug. Used as seed for deterministic shuffle. */
  baseSlug: string
}
