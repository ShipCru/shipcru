import type { ComponentType, SVGProps } from 'react'

import * as UntitledIcons from '@untitledui/icons'

function pascalToKebab(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-zA-Z])(\d)/g, '$1-$2')
    .replace(/(\d)([a-zA-Z])/g, '$1-$2')
    .toLowerCase()
}

function pascalToLabel(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/(\d)([a-zA-Z])/g, '$1 $2')
}

const ALLOWED_ICONS = new Set([
  'check-circle',
  'bar-chart-01',
  'trend-up-01',
  'users-01',
  'clock',
  'star-01',
  'zap',
  'shield-tick',
  'heart',
  'globe-01',
  'award-01',
  'target-01',
  'lightning-01',
  'rocket-01',
  'briefcase-01',
  'file-check-01',
  'thumbs-up',
  'trophy-01',
  'certificate-01',
  'lightbulb-01',
])

const icons = Object.entries(UntitledIcons)
  .filter(([, component]) => typeof component === 'function')
  .map(([name, component]) => ({
    label: pascalToLabel(name),
    value: pascalToKebab(name),
    component: component as ComponentType<SVGProps<SVGSVGElement>>,
  }))
  .filter(({ value }) => ALLOWED_ICONS.has(value))
  .sort((a, b) => a.label.localeCompare(b.label))

export const ICONS = icons.map(({ label, value }) => ({ label, value }))

export const iconMap = Object.fromEntries(
  icons.map(({ value, component }) => [value, component]),
) as Record<string, ComponentType<SVGProps<SVGSVGElement>>>

export type IconName = (typeof icons)[number]['value']

export const Icon = ({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) => {
  const IconComponent = iconMap[name]
  if (!IconComponent) return null
  return <IconComponent aria-hidden {...props} />
}
