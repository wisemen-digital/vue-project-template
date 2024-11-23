import { createI18n } from 'vue-i18n'

import en from './locales/en.json'

type Flatten<T, P extends string = ''> = {
  [K in keyof T]: T[K] extends object
    ? `${P}${K & string}` | Flatten<T[K], `${P}${K & string}.`>
    : `${P}${K & string}`
}[keyof T]

export type I18nKey = Flatten<typeof en>

export enum Locale {
  EN_US = 'en-US',
  NL_BE = 'nl-BE',
}

const messages = {
  [Locale.EN_US]: en,
  [Locale.NL_BE]: en,
}

const defaultLocale = Locale.NL_BE
const localStorageValue = localStorage.getItem('locale')

export const i18nPlugin = createI18n({
  fallbackLocale: defaultLocale,
  legacy: false,
  locale: localStorageValue ?? defaultLocale,
  messages,
})
