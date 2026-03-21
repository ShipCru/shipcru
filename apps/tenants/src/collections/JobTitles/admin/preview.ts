import type { GeneratePreviewURL } from 'payload'

import { getSuffixWords } from '@/globals/SuffixVariations/queries/getSuffixWords'
import { buildSuffixString } from '@/lib/resume-pages/parseResumeUrl'
import { resolveCanonicalSuffix } from '@/lib/resume-pages/resolveCanonicalSuffix'
import { getEntityId } from '@/utilities/getEntityId'
import { generatePreviewPath } from '@/utils/generatePreviewPath'

export const jobTitlePreview: GeneratePreviewURL = async (data, { req }) => {
  const tenantSlug = process.env.DEFAULT_TENANT_SLUG

  const industries = (data?.industries ?? []) as (number | { id: number; slug?: string })[]
  const firstIndustry = industries[0]

  let industrySlug = ''
  if (typeof firstIndustry === 'object' && firstIndustry?.slug) {
    industrySlug = firstIndustry.slug
  } else if (firstIndustry) {
    const industryId = getEntityId(firstIndustry)

    const ind = await req.payload.findByID({
      collection: 'industries',
      id: industryId,
      select: { slug: true },
    })

    industrySlug = ind?.slug ?? ''
  }

  if (!industrySlug) {
    return null
  }

  let path = `/resumes/${industrySlug}/${data?.slug}`

  const suffixData = await getSuffixWords(req.payload)
  const suffix = await resolveCanonicalSuffix(req.payload, data, suffixData)
  if (suffix) {
    path += `-${buildSuffixString(suffix)}`
  }

  return generatePreviewPath({
    slug: data?.slug as string,
    collection: 'job-titles',
    path,
    tenantSlug,
    req,
  })
}
