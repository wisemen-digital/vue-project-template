import type {
  FontSize,
  Locale,
  UiTheme,
} from '@/client'

export interface SettingPreference {
  fontSize: FontSize | null
  highContrast: boolean | null
  language: Locale | null
  reduceMotion: boolean | null
  showShortcuts: boolean | null
  theme: UiTheme | null
}
