import type { HeroSplitImageBlock as HeroSplitImageBlockType, Media } from '@/payload-types'

import { Fragment } from 'react'

import { Avatar } from '@/components/base/avatar/avatar'
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'

const defaultAvatars = [
  {
    src: 'https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80',
    alt: 'Olivia Rhye',
  },
  {
    src: 'https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80',
    alt: 'Phoenix Baker',
  },
  {
    src: 'https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80',
    alt: 'Lana Steiner',
  },
  {
    src: 'https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80',
    alt: 'Demi Wilkinson',
  },
  {
    src: 'https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80',
    alt: 'Candice Wu',
  },
]

const AvatarsWithReview = ({
  className,
  avatars,
  reviewText,
  reviewRating,
}: {
  className?: string
  avatars?: HeroSplitImageBlockType['avatars']
  reviewText?: string | null
  reviewRating?: string | null
}) => {
  const avatarList =
    avatars && avatars.length > 0
      ? avatars.map((a, i) => {
          const image = typeof a.image === 'object' ? (a.image as Media | null) : null
          return {
            src: image?.url ?? undefined,
            alt: image?.alt || `Avatar ${i + 1}`,
          }
        })
      : defaultAvatars

  const rating = reviewRating ?? '5.0'
  const review = reviewText ?? 'from 200+ reviews'

  return (
    <div className={`flex items-center gap-4 ${className ?? ''}`}>
      <div className="inline-flex -space-x-3 overflow-hidden">
        {avatarList.map((avatar, index) => (
          <Avatar key={index} size="md" src={avatar.src} alt={avatar.alt} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <svg
                  key={index}
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  className="relative size-5 shrink-0 grow-0"
                  preserveAspectRatio="none"
                >
                  <g clipPath={`url(#clip0_star_${index})`}>
                    <path
                      d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
                      className="fill-gray-200"
                    />
                    <g clipPath={`url(#clip1_star_${index})`}>
                      <path
                        d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
                        className="fill-yellow-400"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id={`clip0_star_${index}`}>
                      <rect width={20} height={20} fill="white" />
                    </clipPath>
                    <clipPath id={`clip1_star_${index}`}>
                      <rect width={20} height={20} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ))}
          </div>
          <span className="text-base font-semibold text-gray-700">{rating}</span>
        </div>
        <p className="text-base font-medium text-gray-500">{review}</p>
      </div>
    </div>
  )
}

export const HeroSplitImageBlock = ({ data }: { data: HeroSplitImageBlockType }) => {
  const heading = data.heading ?? 'People who care about your growth'
  const description =
    data.description ??
    'Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.'
  const image = typeof data.image === 'object' ? (data.image as Media | null) : null
  const imageSrc = image?.url ?? 'https://www.untitledui.com/images/portraits/person-02'
  const imageAlt = image?.alt ?? 'Portrait'
  const formPlaceholder = data.formPlaceholder ?? 'Enter your email'
  const formButtonLabel = data.formButtonLabel ?? 'Get started'
  const formHelperText = data.formHelperText ?? 'We care about your data in our privacy policy.'

  return (
    <Fragment>
      <section className="bg-white py-16 md:pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 md:px-8 lg:grid-cols-2 lg:gap-8">
          <div className="flex max-w-3xl flex-col items-start lg:pr-8">
            <h1 className="text-4xl font-semibold text-gray-900 md:text-5xl lg:text-6xl">
              {heading}
            </h1>
            <p className="mt-4 max-w-lg text-lg text-balance text-gray-500 md:mt-6 md:text-xl">
              {description}
            </p>

            <form
              action="#"
              className="mt-8 flex w-full flex-col items-stretch gap-4 md:mt-12 md:max-w-[480px] md:flex-row md:items-start"
            >
              <div className="flex flex-1 flex-col gap-1.5 py-0.5">
                <Input
                  isRequired
                  name="email"
                  type="email"
                  size="md"
                  placeholder={formPlaceholder}
                  hint={
                    formHelperText.includes('privacy policy') ? (
                      <>
                        {formHelperText.split('privacy policy')[0]}
                        <a
                          href="#"
                          className="rounded-xs underline underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          privacy policy
                        </a>
                        {formHelperText.split('privacy policy')[1]}
                      </>
                    ) : (
                      formHelperText
                    )
                  }
                />
              </div>
              <Button type="submit" color="primary" size="lg" className="shrink-0">
                {formButtonLabel}
              </Button>
            </form>
            <AvatarsWithReview
              className="mt-8 md:mt-12"
              avatars={data?.avatars}
              reviewText={data?.reviewText}
              reviewRating={data?.reviewRating}
            />
          </div>

          <div className="relative lg:h-full lg:min-h-[640px]">
            <img
              className="inset-0 h-[280px] w-full object-cover md:h-[440px] lg:absolute lg:h-full"
              src={imageSrc}
              alt={imageAlt}
            />
          </div>
        </div>
      </section>
    </Fragment>
  )
}
