'use client'

import type { Header as HeaderType } from '@/payload-types'

import { useRef, useState } from 'react'
import { ChevronDown } from '@untitledui/icons'

import { DropdownMenuSimple } from './dropdown-menu-simple'

type NavItem = NonNullable<HeaderType['navItems']>[number]

export function DropdownNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-gray-600 transition duration-200 hover:bg-gray-100/80 hover:text-gray-900"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown
          className={`size-4 opacity-60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && item.dropdownItems && (
        <div className="absolute left-0 top-full z-50 min-w-80 pt-2">
          <DropdownMenuSimple items={item.dropdownItems} />
        </div>
      )}
    </div>
  )
}
