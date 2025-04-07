import {
  FontSize,
  Locale,
  UiTheme,
} from '@/client'
import type { SettingPreferenceDto } from '@/modules/setting/models/preference/settingPreferenceDto.model.ts'

export class SettingPreferenceDtoBuilder {
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
