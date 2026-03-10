export const SUPPORTED_LOCALES = [
  { label: 'English', value: 'en' },
  { label: 'Español', value: 'es' },
] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]['value']

export const DEFAULT_LOCALE: Locale = 'en'
