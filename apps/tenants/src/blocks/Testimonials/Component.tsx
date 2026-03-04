import { Avatar } from '@/components/base/avatar/avatar'
import { VerifiedTick } from '@/components/base/avatar/base-components/verified-tick'
import type { TestimonialsBlock as TestimonialsBlockType, Media } from '@/payload-types'

const defaultReviews = [
  {
    id: 'review-01',
    quote:
      "We've been using Untitled to kick start every new project and can't imagine working without it.",
    authorName: 'Sienna Hewitt',
    authorTitle: 'Project Manager, Warpspeed',
    authorImage: {
      url: 'https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80',
    },
    companyName: 'Warpspeed',
    companyLogo: {
      url: 'https://www.untitledui.com/logos/logotype/color/warpspeed.svg',
    },
    companyLogoDark: {
      url: 'https://www.untitledui.com/logos/logotype/white/warpspeed.svg',
    },
  },
  {
    id: 'review-02',
    quote:
      'Untitled has become an essential part of our design process. It speeds up our workflow and ensures every project starts with a solid foundation.',
    authorName: 'Caitlyn King',
    authorTitle: 'COO, OdeaoLabs',
    authorImage: {
      url: 'https://www.untitledui.com/images/avatars/caitlyn-king?fm=webp&q=80',
    },
    companyName: 'OdeaoLabs',
    companyLogo: {
      url: 'https://www.untitledui.com/logos/logotype/color/odeaolabs.svg',
    },
    companyLogoDark: {
      url: 'https://www.untitledui.com/logos/logotype/white/odeaolabs.svg',
    },
  },
  {
    id: 'review-03',
    quote:
      "Every project starts with Untitled, and it's made a huge difference in our output. It's a game-changer for our design team.",
    authorName: 'Olly Schroeder',
    authorTitle: 'Designer, Nietzsche',
    authorImage: {
      url: 'https://www.untitledui.com/images/avatars/olly-schroeder?fm=webp&q=80',
    },
    companyName: 'Nietzsche',
    companyLogo: {
      url: 'https://www.untitledui.com/logos/logotype/color/nietzsche.svg',
    },
    companyLogoDark: {
      url: 'https://www.untitledui.com/logos/logotype/white/nietzsche.svg',
    },
  },
  {
    id: 'review-04',
    quote:
      "Using Untitled has streamlined our entire design process. It's an invaluable part of our studio!",
    authorName: "Riley O'Moore",
    authorTitle: 'Design Engineer, QuartzAI',
    authorImage: {
      url: 'https://www.untitledui.com/images/avatars/riley-moore?fm=webp&q=80',
    },
    companyName: 'QuartzAI',
    companyLogo: {
      url: 'https://www.untitledui.com/logos/logotype/color/quartzai.svg',
    },
    companyLogoDark: {
      url: 'https://www.untitledui.com/logos/logotype/white/quartzai.svg',
    },
  },
]

export const TestimonialsBlock = ({ data }: { data: TestimonialsBlockType }) => {
  const heading = data.heading ?? 'Our reviews'
  const description =
    data.description ?? 'Hear first-hand from our incredible community of customers.'
  const reviews = data.reviews?.length ? data.reviews : defaultReviews

  return (
    <div className="flex flex-col items-center gap-16 bg-primary py-16 lg:py-24">
      <div className="flex max-w-container flex-col items-center gap-4 px-4 text-center lg:gap-5 lg:px-8">
        <h1 className="text-display-sm font-semibold text-primary lg:text-display-md">{heading}</h1>
        <p className="text-lg text-tertiary lg:text-xl">{description}</p>
      </div>
      <div className="grid max-w-container grid-cols-1 gap-5 px-4 lg:grid-cols-2 lg:gap-6 lg:px-8">
        {reviews.map((review: (typeof reviews)[number], index: number) => {
          const companyLogo =
            typeof review.companyLogo === 'object' ? (review.companyLogo as Media | null) : null
          const companyLogoDark =
            typeof review.companyLogoDark === 'object'
              ? (review.companyLogoDark as Media | null)
              : null
          const authorImage =
            typeof review.authorImage === 'object' ? (review.authorImage as Media | null) : null
          const companyLogoUrl = companyLogo?.url
          const companyLogoDarkUrl = companyLogoDark?.url
          const authorImageUrl = authorImage?.url
          const companyName = review.companyName ?? ''

          return (
            <div
              key={review.id ?? index}
              className="flex flex-col gap-12 rounded-xl bg-primary_alt p-6 shadow-xs ring-1 ring-secondary lg:min-h-64 lg:justify-between lg:gap-0 lg:p-8"
            >
              <div className="flex flex-col items-start gap-3">
                {companyLogoUrl && (
                  <img
                    className="h-8 lg:hidden dark:hidden"
                    src={companyLogoUrl}
                    alt={companyName}
                  />
                )}
                {companyLogoDarkUrl && (
                  <img
                    className="h-8 opacity-85 not-dark:hidden lg:hidden"
                    src={companyLogoDarkUrl}
                    alt={companyName}
                  />
                )}
                <blockquote className="text-lg font-medium text-primary lg:text-xl">
                  {review.quote}
                </blockquote>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    size="lg"
                    src={authorImageUrl}
                    alt={review.authorName}
                    contrastBorder={false}
                  />
                  <div className="flex flex-col">
                    <span className="relative flex items-center gap-1 text-sm font-semibold text-primary">
                      {review.authorName}
                      <VerifiedTick size="2xl" className="shrink-0" />
                    </span>
                    {review.authorTitle && (
                      <span className="text-sm text-tertiary">{review.authorTitle}</span>
                    )}
                  </div>
                </div>
                {companyLogoUrl && (
                  <img
                    className="h-8 max-lg:hidden dark:hidden"
                    src={companyLogoUrl}
                    alt={companyName}
                  />
                )}
                {companyLogoDarkUrl && (
                  <img
                    className="h-8 opacity-85 not-dark:hidden max-lg:hidden"
                    src={companyLogoDarkUrl}
                    alt={companyName}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
