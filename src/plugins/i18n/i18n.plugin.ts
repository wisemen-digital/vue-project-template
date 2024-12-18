import { createI18n } from 'vue-i18n'

import enUs from '@/locales/en-US.json'
import nlBe from '@/locales/nl-BE.json'

type Flatten<T, P extends string = ''> = {
  [K in keyof T]: T[K] extends object
    ? `${P}${K & string}` | Flatten<T[K], `${P}${K & string}.`>
    : `${P}${K & string}`
}[keyof T]

export type I18nKey = Flatten<typeof enUs>

export enum Locale {
  EN_US = 'en-US',
  NL_BE = 'nl-BE',
}

const messages = {
  [Locale.EN_US]: enUs,
  [Locale.NL_BE]: nlBe,
}

const defaultLocale = Locale.NL_BE
const localStorageValue = localStorage.getItem('locale')

export const i18nPlugin = createI18n({
  fallbackLocale: defaultLocale,
  legacy: false,
  locale: localStorageValue ?? defaultLocale,
  messages,
})
