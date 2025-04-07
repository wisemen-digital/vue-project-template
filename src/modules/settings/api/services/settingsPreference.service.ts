import {
  updateUiPreferencesV1,
  viewUiPreferencesV1,
} from '@/client'
import type { SettingsPreference } from '@/modules/settings/models/preference/settingsPreference.model.ts'
import { SettingsPreferenceTransformer } from '@/modules/settings/models/preference/settingsPreference.transformer.ts'
import type { SettingsPreferenceUpdateForm } from '@/modules/settings/models/preference/settingsPreferenceUpdateForm.model.ts'

export class SettingsPreferenceService {
  static async get(): Promise<SettingsPreference> {
    const response = await viewUiPreferencesV1()

    return SettingsPreferenceTransformer.fromDto(response.data)
  }

  static async update(preference: SettingsPreferenceUpdateForm): Promise<void> {
    await updateUiPreferencesV1({ body: SettingsPreferenceTransformer.toDto(preference) })
  }
}
