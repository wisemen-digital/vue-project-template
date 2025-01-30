import { Theme } from '@/client'
import type { PreferenceDto } from '@/models/preference/preferenceDto.model.ts'

export class PreferenceDtoBuilder {
  value: PreferenceDto = {
    fontSize: 'default',
    highContrast: false,
    language: 'en-US',
    reduceMotion: false,
    showShortcuts: true,
    theme: Theme.LIGHT,
  }

  constructor() {}

  build(): PreferenceDto {
    return this.value
  }
}
