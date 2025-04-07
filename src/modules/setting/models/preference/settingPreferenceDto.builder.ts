import { UiTheme } from '@/client'
import type { SettingPreferenceDto } from '@/modules/setting/models/preference/settingPreferenceDto.model.ts'

export class SettingPreferenceDtoBuilder {
  value: SettingPreferenceDto = {
    fontSize: 'default',
    highContrast: false,
    language: 'en-US',
    reduceMotion: false,
    showShortcuts: true,
    theme: UiTheme.LIGHT,
  }

  constructor() {}

  build(): SettingPreferenceDto {
    return this.value
  }
}
