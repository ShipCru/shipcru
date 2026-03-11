'use client'

import type { LinkField } from '@/payload-types'

import { getCMSLinkHref } from '@/components/CMSLink'
import { NavMenuItemLink } from './base-components/nav-menu-item'

interface DropdownItem {
  link?: LinkField
  subtitle?: string | null
  id?: string | null
}

interface DropdownMenuSimpleProps {
  items: DropdownItem[]
}

export const DropdownMenuSimple = ({ items }: DropdownMenuSimpleProps) => {
  const resolvedItems = items
    .map((item) => {
      if (!item.link) return null
      const href = getCMSLinkHref(item.link)
      if (!href) return null
      return {
        href,
        title: item.link.label ?? '',
        subtitle: item.subtitle ?? undefined,
      }
    })
    .filter(Boolean)

  return (
    <div className="px-3 pb-2 md:p-0">
      <nav className="overflow-hidden rounded-2xl bg-primary py-2 shadow-xs ring-1 ring-secondary_alt md:p-2 md:shadow-lg">
        <ul className="flex flex-col gap-0.5">
          {resolvedItems.map((item) => (
            <li key={item.href}>
              <NavMenuItemLink title={item.title} subtitle={item.subtitle} href={item.href} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
