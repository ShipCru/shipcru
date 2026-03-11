import type { CommonProps } from '@/components/base/buttons/button'
import type { CTABlock as CTABlockType } from '@/payload-types'

import { CMSLink } from '@/components/CMSLink'
import { resolveVariationText } from '@/lib/fields/resolveVariationText'

const variantMap: Record<string, NonNullable<CommonProps['color']>> = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  'link-gray': 'link-gray',
  'link-color': 'link-color',
}

export const CTABlock = ({ data }: { data: CTABlockType }) => {
  const heading = resolveVariationText(data.heading)
  const description = resolveVariationText(data.description)

  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="mx-auto max-w-container px-4 md:px-8">
        <div className="flex flex-col justify-center text-center">
          <h2 className="text-display-sm font-semibold text-primary md:text-display-md">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">{description}</p>
          {data.links && data.links.length > 0 && (
            <div className="mt-8 flex flex-col-reverse gap-3 self-stretch md:flex-row md:self-center">
              {data.links.map((item) => (
                <CMSLink
                  key={item.id}
                  {...item.link}
                  color={variantMap[item.variant || 'primary']}
                  size="xl"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
