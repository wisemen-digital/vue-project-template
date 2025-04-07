import type {
  Locale,
  UiTheme,
} from '@/client'
import type { SettingPreference } from '@/modules/setting/models/preference/settingPreference.model.ts'
import type { SettingPreferenceDto } from '@/modules/setting/models/preference/settingPreferenceDto.model.ts'
import type { SettingPreferenceUpdateDto } from '@/modules/setting/models/preference/settingPreferenceUpdateDto.model.ts'
import type { SettingPreferenceUpdateForm } from '@/modules/setting/models/preference/settingPreferenceUpdateForm.model.ts'

export class SettingPreferenceTransformer {
  static fromDto(dto: SettingPreferenceDto): SettingPreference {
    return {
      fontSize: dto.fontSize,
      highContrast: dto.highContrast,
      language: dto.language as Locale,
      reduceMotion: dto.reduceMotion,
      showShortcuts: dto.showShortcuts,
      theme: dto.theme as UiTheme | null,
    }
  }

  static toDto(model: SettingPreferenceUpdateForm): SettingPreferenceUpdateDto {
    return {
      fontSize: model.fontSize,
      highContrast: model.highContrast,
      language: model.language,
      reduceMotion: model.reduceMotion,
      showShortcuts: model.showShortcuts,
      theme: model.theme,
    }
  }
}
