'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { RESUME_CONTENT_TYPES } from '@/collections/ResumeContent/constants'

const ALL_TAB = { label: 'All', value: '' } as const
const TABS = [
  ALL_TAB,
  ...RESUME_CONTENT_TYPES.map(({ label, value }) => ({ label: `${label}s`, value })),
]

export const TypeFilterTabs: React.FC = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const currentType = searchParams.get('where[type][equals]') ?? ''

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {TABS.map(({ label, value }) => {
        const isActive = currentType === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString())
              if (value) {
                params.set('where[type][equals]', value)
              } else {
                params.delete('where[type][equals]')
              }
              router.push(`${pathname}?${params.toString()}`)
            }}
            className={`px-3 py-1 rounded-md border text-sm cursor-pointer ${
              isActive
                ? 'bg-(--theme-elevation-150) border-(--theme-elevation-150)'
                : 'bg-transparent border-(--theme-elevation-150)'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default TypeFilterTabs
