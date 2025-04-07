import {
  updateUiPreferencesV1,
  viewUiPreferencesV1,
} from '@/client'
import type { SettingPreference } from '@/modules/setting/models/preference/settingPreference.model.ts'
import { SettingPreferenceTransformer } from '@/modules/setting/models/preference/settingPreference.transformer.ts'
import type { SettingPreferenceUpdateForm } from '@/modules/setting/models/preference/settingPreferenceUpdateForm.model.ts'

export class SettingPreferenceService {
  static async get(): Promise<SettingPreference> {
    const response = await viewUiPreferencesV1()

    return SettingPreferenceTransformer.fromDto(response.data)
  }

  static async update(preference: SettingPreferenceUpdateForm): Promise<void> {
    await updateUiPreferencesV1({ body: SettingPreferenceTransformer.toDto(preference) })
  }
}
