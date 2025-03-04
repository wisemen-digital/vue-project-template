import type { Ref } from 'vue'

import type { I18nKey } from '@/plugins/i18n.plugin.ts'

declare module 'vue-i18n' {
  function useI18n(): {
    d: typeof import('@/plugins/i18n.plugin.ts').i18nPlugin.global.d
    locale: Ref<import('@/plugins/i18n.plugin.ts').Locale>
    n: typeof import('@/plugins/i18n.plugin.ts').i18nPlugin.global.n
    t: (key: I18nKey, ...args: unknown[]) => string
  }
}
