import { useLocalStorage } from '@vueuse/core'
import type { Ref } from 'vue'
import {
  computed,
  watch,
} from 'vue'
import { useI18n } from 'vue-i18n'

import { Locale } from '@/client'
import { client } from '@/client/client.gen.ts'

interface UseLanguageSelectReturnType {
  displayFn: (value: Locale) => string
  items: Locale[]
  value: Ref<Locale>
}

const LOCAL_STORAGE_KEY = 'lang'

export function useLanguageSelect(): UseLanguageSelectReturnType {
  const i18n = useI18n()

  const locale = useLocalStorage<Locale>(LOCAL_STORAGE_KEY, i18n.locale.value as Locale)

  const locales: Locale[] = [
    Locale.EN_US,
    Locale.NL_BE,
  ]

  const i18nKeys = computed<Record<Locale, string>>(() => ({
    [Locale.EN_US]: i18n.t('module.settings.language.locales.en_us'),
    [Locale.NL_BE]: i18n.t('module.settings.language.locales.nl_be'),
  }))

  function displayFn(value: Locale): string {
    return i18nKeys.value[value]
  }

  return {
    displayFn,
    items: locales,
    value: locale,
  }
}

export function useLanguage(): void {
  const i18n = useI18n()
  const locale = useLocalStorage<Locale>(LOCAL_STORAGE_KEY, i18n.locale.value as Locale)

  client.setConfig({ headers: { 'Accept-Language': locale.value } })

  watch(locale, () => {
    i18n.locale.value = locale.value
  }, { immediate: true })
}
