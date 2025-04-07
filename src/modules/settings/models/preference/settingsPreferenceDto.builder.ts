import {
  FontSize,
  Locale,
  UiTheme,
} from '@/client'
import type { SettingPreferenceDto } from '@/modules/settings/models/preference/settingsPreferenceDto.model.ts'

export class SettingsPreferenceDtoBuilder {
  value: SettingPreferenceDto = {
    fontSize: FontSize.DEFAULT,
    highContrast: false,
    language: Locale.EN_US,
    reduceMotion: false,
    showShortcuts: true,
    theme: UiTheme.LIGHT,
  }

  constructor() {}

  build(): SettingPreferenceDto {
    return this.value
  }
}
