import { type I18nKey, i18nPlugin } from '@/plugins/i18n/i18n.plugin'

interface UseI18nReturnType {
  t: (key: I18nKey, ...args: unknown[]) => string
}

export function useI18n(): UseI18nReturnType {
  const { t: _t } = i18nPlugin.global

  return {
    t: _t,
  }
}
