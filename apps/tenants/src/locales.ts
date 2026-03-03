export const SUPPORTED_LOCALES = [{ label: 'English', value: 'en' }] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]['value']

export const DEFAULT_LOCALE: Locale = 'en'
