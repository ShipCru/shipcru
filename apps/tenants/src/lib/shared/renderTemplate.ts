import type { Block } from '@/blocks/RenderBlocks'
import type { SectionConfig, SubstitutionContext, VariationInput } from '@/lib/resume-pages/types'

import { orderSections } from '@/lib/resume-pages/orderSections'
import {
  resolveVariationsInSection,
  sectionToBlock,
  substituteSection,
} from '@/lib/resume-pages/renderHelpers'

export interface AssembledPage {
  heroBlock: Block | null
  sectionBlocks: Block[]
}

export function renderTemplate(
  hero: SectionConfig | null,
  sections: SectionConfig[],
  variationCtx: VariationInput,
  subCtx: SubstitutionContext,
  baseSlug: string,
): AssembledPage {
  const resolvedHero = hero ? resolveVariationsInSection(hero, variationCtx) : null
  const resolvedSections = sections.map((s) => resolveVariationsInSection(s, variationCtx))

  const subHero = resolvedHero ? substituteSection(resolvedHero, subCtx) : null
  const subSections = resolvedSections.map((s) => substituteSection(s, subCtx))

  const ordered = orderSections({ sections: subSections, baseSlug })

  return {
    heroBlock: subHero ? sectionToBlock(subHero) : null,
    sectionBlocks: ordered.map(sectionToBlock),
  }
}
