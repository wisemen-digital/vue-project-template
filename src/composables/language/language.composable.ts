import { useLocalStorage } from '@vueuse/core'
import type { SelectItem } from '@wisemen/vue-core'
import {
  computed,
  type ComputedRef,
  type Ref,
  watch,
} from 'vue'
import { useI18n } from 'vue-i18n'

import { Locale } from '@/plugins/i18n/i18n.plugin'

interface UseLanguageSelectReturnType {
  displayFn: (value: Locale) => string
  items: ComputedRef<SelectItem<Locale>[]>
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
    [Locale.EN_US]: i18n.t('module.setting.language.locales.en_us'),
    [Locale.NL_BE]: i18n.t('module.setting.language.locales.nl_be'),
  }))

  const languageSelectItems = computed<SelectItem<Locale>[]>(() => {
    return locales.map((locale) => ({
      type: 'option',
      value: locale,
    }))
  })

  function displayFn(value: Locale): string {
    return i18nKeys.value[value]
  }

  return {
    displayFn,
    items: languageSelectItems,
    value: locale,
  }
}

export function useLanguage(): void {
  const i18n = useI18n()
  const locale = useLocalStorage<Locale>(LOCAL_STORAGE_KEY, i18n.locale.value as Locale)

  watch(locale, () => {
    i18n.locale.value = locale.value
  }, {
    immediate: true,
  })
}