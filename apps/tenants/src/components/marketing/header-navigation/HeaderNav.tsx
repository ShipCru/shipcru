import type { Header as HeaderType } from '@/payload-types'

import Link from 'next/link'

import { getCMSLinkHref } from '@/components/CMSLink'
import { getCachedHeader } from '@/globals/Header/queries/getHeader'
import { DropdownNavItem } from './DropdownNavItem'
import { HeaderSearch } from './HeaderSearch'

type NavItem = NonNullable<HeaderType['navItems']>[number]

export async function HeaderNav() {
  const header = await getCachedHeader()
  const navItems = header.navItems ?? []

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/60 bg-white/70 shadow-sm shadow-gray-900/5 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8">
        {/* Brand wordmark */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-brand-solid shadow-sm shadow-brand-700/20 ring-1 ring-brand-700/10 transition duration-200 group-hover:shadow-md group-hover:shadow-brand-700/25">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="size-4.5 text-white"
              aria-hidden="true"
            >
              <path
                d="M10 2L3 7v6c0 3.5 3 5.5 7 9 4-3.5 7-5.5 7-9V7l-7-5z"
                fill="currentColor"
                opacity="0.9"
              />
              <path
                d="M10 5l2.5 3.5H13L10 12 7 8.5h.5L10 5z"
                fill="white"
                opacity="0.85"
              />
            </svg>
          </div>
          <span className="text-md font-bold tracking-tight text-gray-900">
            Rocket Resume
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden sm:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => (
              <li key={item.id}>
                {item.type === 'dropdown' ? (
                  <DropdownNavItem item={item} />
                ) : (
                  <SimpleNavLink item={item} />
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Search + CTA */}
        <div className="flex items-center gap-2">
          <HeaderSearch />
          <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-solid px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-700/20 ring-1 ring-brand-700/10 transition duration-200 hover:bg-brand-solid_hover hover:shadow-md hover:shadow-brand-700/25"
        >
          Build Resume
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="size-3.5 text-white/70"
            aria-hidden="true"
          >
            <path
              d="M3.33 8h9.34M8.67 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}

function SimpleNavLink({ item }: { item: NavItem }) {
  const href = item.link ? getCMSLinkHref(item.link) : undefined
  if (!href) return null

  return (
    <Link
      href={href}
      className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-600 transition duration-200 hover:bg-gray-100/80 hover:text-gray-900"
    >
      {item.link?.label}
    </Link>
  )
}
