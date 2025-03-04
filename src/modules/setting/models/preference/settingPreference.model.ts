import type { Theme } from '@/client'
import type { Locale } from '@/plugins/i18n.plugin.ts'

export interface SettingPreference {
  fontSize: string | null
  highContrast: boolean | null
  language: Locale | null
  reduceMotion: boolean | null
  showShortcuts: boolean | null
  theme: Theme | null
}
