'use client'

import { type RefObject, useEffect, useState } from 'react'
import { useEventListener } from 'usehooks-ts'

export function useSearchPanel(inputRef: RefObject<HTMLInputElement | null>) {
  const [open, setOpen] = useState(false)

  useEventListener('keydown', (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setOpen((prev) => !prev)
    }
    if (e.key === 'Escape') setOpen(false)
  })

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open, inputRef])

  return { open, setOpen }
}
