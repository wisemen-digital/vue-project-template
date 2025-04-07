import type {
  Locale,
  UiTheme,
} from '@/client'
import type { SettingsPreference } from '@/modules/settings/models/preference/settingsPreference.model.ts'
import type { SettingsPreferenceDto } from '@/modules/settings/models/preference/settingsPreferenceDto.model.ts'
import type { SettingsPreferenceUpdateDto } from '@/modules/settings/models/preference/settingsPreferenceUpdateDto.model.ts'
import type { SettingsPreferenceUpdateForm } from '@/modules/settings/models/preference/settingsPreferenceUpdateForm.model.ts'

export class SettingsPreferenceTransformer {
  static fromDto(dto: SettingsPreferenceDto): SettingsPreference {
    return {
      fontSize: dto.fontSize,
      highContrast: dto.highContrast,
      language: dto.language as Locale,
      reduceMotion: dto.reduceMotion,
      showShortcuts: dto.showShortcuts,
      theme: dto.theme as UiTheme | null,
    }
  }

  static toDto(model: SettingsPreferenceUpdateForm): SettingsPreferenceUpdateDto {
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
