import { createI18n } from 'vue-i18n'

import en from './locales/en.json'

enum Locale {
  EN = 'en-US',
}

const messages = {
  [Locale.EN]: en,
}

type Flatten<T, P extends string = ''> = {
  [K in keyof T]: T[K] extends object
    ? `${P}${K & string}` | Flatten<T[K], `${P}${K & string}.`>
    : `${P}${K & string}`
}[keyof T]

export type I18nKey = Flatten<typeof en>

const defaultLocale = Locale.EN

export const i18nPlugin = createI18n({
  fallbackLocale: defaultLocale,
  legacy: false,
  locale: defaultLocale,
  messages,
})
