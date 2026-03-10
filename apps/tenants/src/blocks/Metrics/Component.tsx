import type { MetricsBlock as MetricsBlockType } from '@/payload-types'
import type { FC } from 'react'

import { ArrowRight } from '@untitledui/icons'

import { Button } from '@/components/base/buttons/button'
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon'
import { iconMap } from '@/components/icons'
import { resolveVariationText } from '@/lib/fields/resolveVariationText'

export const MetricsBlock = ({ data }: { data: MetricsBlockType }) => {
  const heading = resolveVariationText(data.heading, 'Build something great')
  const description = resolveVariationText(
    data.description,
    'Everything you need to build modern UI and great products.',
  )

  if (!(data.metrics && data.metrics.length > 0)) {
    return null
  }

  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="mx-auto max-w-container px-4 md:px-8">
        <div className="flex flex-col gap-12 md:gap-16">
          <div className="flex w-full flex-col items-center self-center text-center md:max-w-3xl">
            <h2 className="mt-4 text-display-sm font-semibold text-primary md:mt-6 md:text-display-md">
              {heading}
            </h2>
            <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">{description}</p>
          </div>
          <dl className="flex flex-col justify-between gap-10 md:flex-row md:gap-8">
            {data.metrics.map((item) => {
              const IconComponent = item.icon
                ? (iconMap[item.icon] as FC<{ className?: string }>)
                : null
              return (
                <div
                  key={item.icon || item.label}
                  className="relative flex-1 overflow-hidden pt-4 md:mt-0 md:pt-0 md:pl-6"
                >
                  <div className="absolute top-0 left-0 h-full w-full border-t-2 border-brand-primary md:border-t-0 md:border-l-2" />
                  <div className="flex items-start justify-between gap-4 md:flex-col">
                    <div className="flex flex-col gap-3">
                      {IconComponent && (
                        <dd>
                          <FeaturedIcon
                            icon={IconComponent}
                            color="brand"
                            theme="modern"
                            size="lg"
                          />
                        </dd>
                      )}
                      <dt className="text-lg font-semibold text-primary">{item.label}</dt>
                      {item.description && (
                        <dd className="text-sm text-tertiary">{item.description}</dd>
                      )}
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
              )
            })}
          </dl>
        </div>
      </div>
    </section>
  )
}
