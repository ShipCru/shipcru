import type { MetricsBlock as MetricsBlockType } from '@/payload-types'

import { ArrowRight, ZapFast } from '@untitledui/icons'

import { Button } from '@/components/base/buttons/button'
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon'

const defaultMetrics = [
  {
    value: '400+',
    label: 'Projects completed',
    description: "We've helped build over 400 amazing projects.",
    ctaLabel: 'View projects',
    ctaLink: '#',
  },
  {
    value: '600%',
    label: 'Return on investment',
    description: 'Our customers have reported an average of ~600% ROI.',
    ctaLabel: 'Learn more',
    ctaLink: '#',
  },
  {
    value: '10k',
    label: 'Global downloads',
    description: 'Our free UI kit has been downloaded over 10k times.',
    ctaLabel: 'Download now',
    ctaLink: '#',
  },
  {
    value: '200+',
    label: '5-star reviews',
    description: "We're proud of our 5-star rating with over 200 reviews.",
    ctaLabel: 'View reviews',
    ctaLink: '#',
  },
]

export const MetricsBlock = ({ data }: { data: MetricsBlockType }) => {
  const heading = data.heading || 'Build something great'
  const description =
    data.description || 'Everything you need to build modern UI and great products.'
  const metrics = data.metrics?.length ? data.metrics : defaultMetrics

  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="mx-auto max-w-container px-4 md:px-8">
        <div className="flex flex-col gap-12 md:gap-16">
          <div className="flex w-full flex-col items-center self-center text-center md:max-w-3xl">
            <FeaturedIcon icon={ZapFast} color="gray" theme="modern" size="xl" />

            <h2 className="mt-4 text-display-sm font-semibold text-primary md:mt-6 md:text-display-md">
              {heading}
            </h2>
            <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">{description}</p>
          </div>
          <dl className="flex flex-col justify-between gap-10 md:flex-row md:gap-8">
            {metrics.map((item: (typeof metrics)[number]) => (
                <div
                  key={item.value}
                  className="relative flex-1 overflow-hidden pt-4 md:mt-0 md:pt-0 md:pl-6"
                >
                  <div className="absolute top-0 left-0 h-full w-full border-t-2 border-brand-primary md:border-t-0 md:border-l-2" />
                  <div className="flex items-start justify-between gap-4 md:flex-col">
                    <div className="flex flex-col-reverse gap-1">
                      <dt className="text-lg font-semibold text-primary">{item.label}</dt>
                      <dd className="text-display-lg font-semibold text-brand-tertiary_alt">
                        {item.value}
                      </dd>
                    </div>
                    {item.ctaLabel && (
                      <Button
                        color="link-color"
                        size="lg"
                        href={item.ctaLink || '#'}
                        iconTrailing={ArrowRight}
                      >
                        {item.ctaLabel}
                      </Button>
                    )}
                  </div>
                </div>
              ),
            )}
          </dl>
        </div>
      </div>
    </section>
  )
}
