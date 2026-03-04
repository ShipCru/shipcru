'use client'

import { cx } from '@/utils/styles/cx'
import type { ReactNode, Ref } from 'react'
import type { TextProps as AriaTextProps } from 'react-aria-components'
import { Text as AriaText } from 'react-aria-components'

interface HintTextProps extends AriaTextProps {
  /** Indicates that the hint text is an error message. */
  isInvalid?: boolean
  ref?: Ref<HTMLElement>
  children: ReactNode
}

export const HintText = ({ isInvalid, className, ref, ...props }: HintTextProps) => {
  return (
    <AriaText
      {...props}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- react-aria ref type incompatible with React 19
      ref={ref as any}
      slot={isInvalid ? 'errorMessage' : 'description'}
      className={cx(
        'text-sm text-tertiary',

        // Invalid state
        isInvalid && 'text-error-primary',
        'group-invalid:text-error-primary',

        className,
      )}
    />
  )
}

HintText.displayName = 'HintText'
