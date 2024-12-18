import type { Ref } from 'vue'

import type { I18nKey } from '@/plugins/i18n/i18n.plugin'

declare module 'vue-i18n' {
  function useI18n(): {
    d: typeof import('@/plugins/i18n/i18n.plugin').i18nPlugin.global.d
    locale: Ref<import('@/plugins/i18n/i18n.plugin').Locale>
    n: typeof import('@/plugins/i18n/i18n.plugin').i18nPlugin.global.n
    t: (key: I18nKey, ...args: unknown[]) => string
  }
}
