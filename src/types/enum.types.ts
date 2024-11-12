import type { Icon } from '@wisemen/vue-core'

import type { I18nKey } from '@/plugins/i18n/i18n.plugin.ts'

export type RequiredKeys<TEnum extends string, TValue> = {
  [K in TEnum]: TValue
}

export type IconMap<TEnum extends string> = RequiredKeys<TEnum, Icon>

export type I18nKeyMap<TEnum extends string> = RequiredKeys<TEnum, I18nKey>
