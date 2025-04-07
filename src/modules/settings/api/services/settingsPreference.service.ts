import {
  updateUiPreferencesV1,
  viewUiPreferencesV1,
} from '@/client'
import type { SettingPreference } from '@/modules/settings/models/preference/settingsPreference.model.ts'
import { SettingsPreferenceTransformer } from '@/modules/settings/models/preference/settingsPreference.transformer.ts'
import type { SettingPreferenceUpdateForm } from '@/modules/settings/models/preference/settingsPreferenceUpdateForm.model.ts'

export class SettingsPreferenceService {
  static async get(): Promise<SettingPreference> {
    const response = await viewUiPreferencesV1()

    return SettingsPreferenceTransformer.fromDto(response.data)
  }

  static async update(preference: SettingPreferenceUpdateForm): Promise<void> {
    await updateUiPreferencesV1({ body: SettingsPreferenceTransformer.toDto(preference) })
  }
}
