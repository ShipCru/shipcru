'use client'

import type { BlogBlock as BlogBlockType, Media } from '@/payload-types'

import { PaginationPageDefault } from '@/components/application/pagination/pagination'
import { Button } from '@/components/base/buttons/button'
import { Form } from '@/components/base/form/form'
import { Input } from '@/components/base/input/input'
import {
  type Article,
  Simple02Vertical,
} from '@/components/marketing/blog/base-components/blog-cards'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { resolveVariationText } from '@/lib/fields/resolveVariationText'
import { cx } from '@/utils/styles/cx'

const defaultArticles: Article[] = [
  {
    id: 'article-1',
    title: 'UX review presentations',
    summary:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    href: '#',
    category: { name: 'Design', href: '#' },
    thumbnailUrl: 'https://www.untitledui.com/marketing/spirals.webp',
    publishedAt: '20 Jan 2025',
    readingTime: '8 min read',
    author: {
      name: 'Olivia Rhye',
      href: '#',
      avatarUrl: 'https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80',
    },
  },
  {
    id: 'article-2',
    title: 'Migrating to Linear 101',
    summary:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
    href: '#',
    category: { name: 'Product', href: '#' },
    thumbnailUrl: 'https://www.untitledui.com/marketing/conversation.webp',
    publishedAt: '19 Jan 2025',
    readingTime: '8 min read',
    author: {
      name: 'Phoenix Baker',
      href: '#',
      avatarUrl: 'https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80',
    },
  },
  {
    id: 'article-3',
    title: 'Building your API stack',
    summary:
      'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
    href: '#',
    category: { name: 'Software Engineering', href: '#' },
    thumbnailUrl: 'https://www.untitledui.com/blog/two-mobile-shapes-pattern.webp',
    publishedAt: '18 Jan 2025',
    readingTime: '8 min read',
    author: {
      name: 'Lana Steiner',
      href: '#',
      avatarUrl: 'https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80',
    },
  },
  {
    id: 'article-4',
    title: 'Bill Walsh leadership lessons',
    summary:
      'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?',
    href: '#',
    category: { name: 'Product', href: '#' },
    thumbnailUrl: 'https://www.untitledui.com/blog/two-people.webp',
    publishedAt: '17 Jan 2025',
    readingTime: '8 min read',
    author: {
      name: 'Alec Whitten',
      href: '#',
      avatarUrl: 'https://www.untitledui.com/images/avatars/alec-whitten?fm=webp&q=80',
    },
  },
  {
    id: 'article-5',
    title: 'PM mental models',
    summary: 'Mental models are simple expressions of complex processes or relationships.',
    href: '#',
    category: { name: 'Product', href: '#' },
    thumbnailUrl: 'https://www.untitledui.com/marketing/smiling-girl-6.webp',
    publishedAt: '16 Jan 2025',
    readingTime: '8 min read',
    author: {
      name: 'Demi Wilkinson',
      href: '#',
      avatarUrl: 'https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80',
    },
  },
  {
    id: 'article-6',
    title: 'What is wireframing?',
    summary: 'Introduction to Wireframing and its Principles. Learn from the best in the industry.',
    href: '#',
    category: { name: 'Design', href: '#' },
    thumbnailUrl: 'https://www.untitledui.com/marketing/wireframing-layout.webp',
    publishedAt: '15 Jan 2025',
    readingTime: '8 min read',
    author: {
      name: 'Candice Wu',
      href: '#',
      avatarUrl: 'https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80',
    },
  },
  {
    id: 'article-7',
    title: 'How collaboration makes us better designers',
    summary: 'Collaboration can make our teams stronger, and our individual designs better.',
    href: '#',
    category: { name: 'Design', href: '#' },
    thumbnailUrl: 'https://www.untitledui.com/marketing/two-people.webp',
    publishedAt: '14 Jan 2025',
    readingTime: '8 min read',
    author: {
      name: 'Natali Craig',
      href: '#',
      avatarUrl: 'https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80',
    },
  },
  {
    id: 'article-8',
    title: 'Our top 10 Javascript frameworks to use',
    summary:
      'JavaScript frameworks make development easy with extensive features and functionalities.',
    href: '#',
    category: { name: 'Product', href: '#' },
    thumbnailUrl: 'https://www.untitledui.com/marketing/workspace-5.webp',
    publishedAt: '13 Jan 2025',
    readingTime: '8 min read',
    author: {
      name: 'Drew Cano',
      href: '#',
      avatarUrl: 'https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80',
    },
  },
  {
    id: 'article-9',
    title: 'Podcast: Creating a better CX Community',
    summary: "Starting a community doesn't need to be complicated, but how do you get started?",
    href: '#',
    category: { name: 'Customer Success', href: '#' },
    thumbnailUrl: 'https://www.untitledui.com/marketing/sythesize.webp',
    publishedAt: '12 Jan 2025',
    readingTime: '8 min read',
    author: {
      name: 'Orlando Diggs',
      href: '#',
      avatarUrl: 'https://www.untitledui.com/images/avatars/orlando-diggs?fm=webp&q=80',
    },
  },
]

export const BlogBlock = ({ data }: { data: BlogBlockType }) => {
  const isDesktop = useBreakpoint('lg')

  const label = data.label || 'Blog'
  const heading = resolveVariationText(data.heading, 'Resource library')
  const description = resolveVariationText(
    data.description,
    'Subscribe to learn about new product features, the latest in technology, solutions, and updates.',
  )
  const formPlaceholder = data.formPlaceholder || 'Enter your email'
  const formButtonLabel = data.formButtonLabel || 'Subscribe'

  const articles: Article[] =
    data.articles && data.articles.length > 0
      ? data.articles.map((item, index) => {
          const thumbnail = typeof item.thumbnail === 'object' ? (item.thumbnail as Media) : null
          const authorImage =
            typeof item.authorImage === 'object' ? (item.authorImage as Media) : null
          return {
            id: item.id || `article-${index}`,
            title: item.title || '',
            summary: item.summary || '',
            href: item.href || '#',
            category: {
              name: item.categoryName || '',
              href: '#',
            },
            thumbnailUrl: thumbnail?.url || '',
            publishedAt: item.publishedAt || '',
            readingTime: item.readingTime || '',
            author: {
              name: item.authorName || '',
              href: '#',
              avatarUrl: authorImage?.url || '',
            },
          }
        })
      : defaultArticles

  return (
    <div className="bg-primary">
      <section className="bg-secondary pt-16 pb-32 md:pt-24 md:pb-40">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
            <span className="text-sm font-semibold text-brand-secondary md:text-md">{label}</span>
            <h2 className="mt-3 text-display-md font-semibold text-primary md:text-display-lg">
              {heading}
            </h2>
            <p className="mt-4 text-lg text-tertiary md:mt-6 md:text-xl">{description}</p>
            <Form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = Object.fromEntries(new FormData(e.currentTarget))
                console.log('Form data:', formData)
              }}
              className="mt-8 grid w-full grid-cols-1 items-start gap-4 sm:mt-12 sm:w-auto sm:grid-cols-[345px_max-content]"
            >
              <div className="flex flex-col gap-1.5 text-start">
                <Input
                  isRequired
                  size="md"
                  name="email"
                  type="email"
                  placeholder={formPlaceholder}
                  wrapperClassName="py-0.5"
                />
                <span className="flex w-full text-sm text-tertiary">
                  We care about your data in our&nbsp;
                  <a
                    href="#"
                    className="rounded-xs underline underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    privacy policy
                  </a>
                  .
                </span>
              </div>
              <Button type="submit" size="xl">
                {formButtonLabel}
              </Button>
            </Form>
          </div>
        </div>
      </section>

      <main className="mx-auto -mt-16 flex w-full max-w-container flex-col gap-12 px-4 pb-16 md:-mt-24 md:px-8 md:pb-24 lg:gap-16">
        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.id} className={cx(!isDesktop && 'nth-[n+7]:hidden')}>
              <Simple02Vertical
                article={{
                  ...article,
                  category: {
                    name: article.category.name || 'Design',
                    href: article.category.href || '#',
                  },
                }}
              />
            </li>
          ))}
        </ul>

        <PaginationPageDefault rounded />
      </main>
    </div>
  )
}

export default BlogBlock
