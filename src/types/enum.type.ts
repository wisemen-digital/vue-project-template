import type { Icon } from '@wisemen/vue-core-components'

import type { I18nKey } from '@/plugins/i18n.plugin.ts'

export type RequiredKeys<TEnum extends string, TValue> = {
  [K in TEnum]: TValue
}

export type IconMap<TEnum extends string> = RequiredKeys<TEnum, Icon>
export type I18nKeyMap<TEnum extends string> = Map<TEnum, I18nKey>

export function createI18nKeyMap<TEnum extends string>(enumValues: RequiredKeys<TEnum, I18nKey>): I18nKeyMap<TEnum> {
  return new Map(Object.entries(enumValues)) as I18nKeyMap<TEnum>
}
