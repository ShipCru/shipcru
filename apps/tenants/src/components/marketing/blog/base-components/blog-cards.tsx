'use client'

import type { ComponentProps } from 'react'

import { ArrowUpRight } from '@untitledui/icons'

import { Avatar } from '@/components/base/avatar/avatar'
import { BadgeGroup } from '@/components/base/badges/badge-groups'
import { cx } from '@/utils/styles/cx'

export type Article = {
  id: string
  href: string
  thumbnailUrl: string
  title: string
  summary: string
  category: {
    href: string
    name: string
  }
  author: {
    href: string
    name: string
    avatarUrl: string
  }
  publishedAt: string
  readingTime: string
  tags?: Array<{ name: string; color: string; href: string }>
  isFeatured?: boolean
}

export const Simple02Vertical = ({
  article,
  badgeTheme = 'light',
  imageClassName,
}: {
  article: Article
  badgeTheme?: ComponentProps<typeof BadgeGroup>['theme']
  imageClassName?: string
}) => (
  <article className="flex flex-col gap-4">
    <a href={article.href} className="overflow-hidden" tabIndex={-1}>
      <img
        src={article.thumbnailUrl}
        alt={article.title}
        className={cx('aspect-[1.5] w-full object-cover', imageClassName)}
      />
    </a>

    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-start gap-3">
        <BadgeGroup
          addonText={article.category.name}
          size="md"
          theme={badgeTheme}
          color="brand"
          className="pr-3"
          iconTrailing={null}
        >
          {article.readingTime}
        </BadgeGroup>
        <div className="flex flex-col gap-1">
          <a
            href={article.category.href}
            className="flex justify-between gap-x-4 rounded-md text-lg font-semibold text-primary outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {article.title}
            <ArrowUpRight
              className="mt-0.5 size-6 shrink-0 text-fg-quaternary"
              aria-hidden="true"
            />
          </a>
          <p className="line-clamp-2 text-md text-tertiary md:line-clamp-none">{article.summary}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <a href={article.author.href} tabIndex={-1} className="flex">
          <Avatar focusable alt={article.author.name} src={article.author.avatarUrl} size="md" />
        </a>

        <div>
          <a
            href={article.author.href}
            className="block rounded-xs text-sm font-semibold text-primary outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {article.author.name}
          </a>
          <time className="block text-sm text-tertiary">{article.publishedAt}</time>
        </div>
      </div>
    </div>
  </article>
)
