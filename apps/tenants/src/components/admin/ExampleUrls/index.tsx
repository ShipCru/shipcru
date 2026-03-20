import type { Industry } from '@/payload-types'
import type { UIFieldServerComponent } from 'payload'

import {
  buildTemplateWordPools,
  getSuffixWords,
} from '@/globals/SuffixVariations/queries/getSuffixWords'
import { CopyableUrl } from './CopyableUrl'

const MAX_EXAMPLES = 5

const Hint = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs text-(--theme-elevation-500)">{children}</p>
)

export const ExampleUrls: UIFieldServerComponent = async ({ payload, data }) => {
  const slug = data?.slug as string | undefined
  const industries = data?.industries as (Industry | number)[] | undefined

  if (!slug) {
    return <Hint>Save the document to see example URLs.</Hint>
  }

  const pools = buildTemplateWordPools(await getSuffixWords(payload))
  const adjectives = [...new Set(pools.adjective)]
  const builders = [...new Set(pools.verber)]
  const contentWords = [...new Set(pools.contentWord)]

  if (!adjectives.length || !builders.length || !contentWords.length) {
    return <Hint>Configure suffix variations to see example URLs.</Hint>
  }

  const industryIds = (industries ?? [])
    .map((i) => (typeof i === 'number' ? i : i?.id))
    .filter((id): id is number => id != null)

  let industrySlugs: string[] = []
  if (industryIds.length) {
    const { docs } = await payload.find({
      collection: 'industries',
      where: { id: { in: industryIds } },
      select: { slug: true },
      limit: industryIds.length,
    })
    industrySlugs = docs.map((d) => d.slug).filter(Boolean) as string[]
  }

  const industrySlug = industrySlugs[0]

  if (!industrySlug) {
    return <Hint>Assign an industry to see example URLs.</Hint>
  }

  const basePrefix = `/resumes/${industrySlug}/${slug}`

  const seen = new Set<string>()
  const examples: string[] = []
  outer: for (const adj of adjectives) {
    for (const builder of builders) {
      for (const content of contentWords) {
        const suffix = `-${adj}-resume-${builder}-${content}`
        const url = `${basePrefix}${suffix}`
        if (!seen.has(url)) {
          seen.add(url)
          examples.push(suffix)
          if (examples.length >= MAX_EXAMPLES) break outer
        }
      }
    }
  }

  const totalVariations = adjectives.length * builders.length * contentWords.length

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[13px] font-semibold text-(--theme-text)">Example URLs</span>
        <span className="text-[11px] tabular-nums text-(--theme-elevation-500)">
          {totalVariations.toLocaleString()} variations{' '}
          <span className="opacity-60">
            ({adjectives.length}&times;{builders.length}&times;{contentWords.length})
          </span>
          {industrySlugs.length > 1 && (
            <span className="opacity-60"> &middot; {industrySlugs.length} industries</span>
          )}
        </span>
      </div>

      <div className="flex flex-col gap-0.5 rounded-md border border-(--theme-elevation-150) bg-(--theme-elevation-50) p-1.5">
        <code className="block px-1.5 pb-1 text-[11px] text-(--theme-elevation-400)">
          {basePrefix}
        </code>

        {examples.map((suffix, i) => (
          <CopyableUrl key={i} url={`${basePrefix}${suffix}`}>
            <span className="opacity-30">&hellip;</span>
            {suffix}
          </CopyableUrl>
        ))}
      </div>

      {industrySlugs.length > 1 && (
        <p className="text-[11px] text-(--theme-elevation-500)">
          Showing <strong className="font-medium">{industrySlug}</strong>. Also:{' '}
          {industrySlugs.slice(1).join(', ')}
        </p>
      )}
    </div>
  )
}
