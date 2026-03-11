import type { Page } from '@/payload-types'

import Link from 'next/link'

import { Button, type CommonProps } from '@/components/base/buttons/button'
import { buildUrl } from '@/utils/buildUrl'

type LinkReference = {
  relationTo: 'pages'
  value: Page | number
}

type CMSLinkData = {
  type?: 'reference' | 'custom' | null
  reference?: LinkReference | null
  url?: string | null
  label?: string | null
  newTab?: boolean | null
}

export type CMSLinkProps = CMSLinkData &
  Pick<CommonProps, 'color' | 'size'> & {
    children?: React.ReactNode
    className?: string
  }

export function getCMSLinkHref(
  link: Pick<CMSLinkData, 'type' | 'reference' | 'url'>,
): string | undefined {
  if (link.type === 'reference') {
    const ref = link.reference
    if (!ref || typeof ref.value !== 'object') return undefined

    if (ref.relationTo === 'pages') {
      return buildUrl({ collection: 'pages', breadcrumbs: ref.value.breadcrumbs }) || '/'
    }

    return undefined
  }

  return link.url ?? undefined
}

export function hasCMSLink(
  link: Pick<CMSLinkData, 'type' | 'reference' | 'url'> | null | undefined,
): boolean {
  if (!link) return false
  return Boolean(getCMSLinkHref(link))
}

export function CMSLink({
  type,
  reference,
  url,
  label,
  newTab,
  children,
  className,
  color,
  size,
}: CMSLinkProps) {
  const href = getCMSLinkHref({ type, reference, url })

  if (!href) return null

  const newTabProps = newTab
    ? { rel: 'noopener noreferrer' as const, target: '_blank' as const }
    : {}

  const content = (
    <>
      {label}
      {children}
      {newTab && (label || children) && <span className="sr-only">(opens in new tab)</span>}
    </>
  )

  if (color || size) {
    return (
      <Button href={href} color={color} size={size} className={className} {...newTabProps}>
        {content}
      </Button>
    )
  }

  return (
    <Link href={href} className={className} {...newTabProps}>
      {content}
    </Link>
  )
}
