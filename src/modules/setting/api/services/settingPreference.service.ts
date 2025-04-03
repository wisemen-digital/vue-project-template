import {
  updatePreferencesV1,
  viewPreferencesV1,
} from '@/client'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import type { SettingPreference } from '@/modules/setting/models/preference/settingPreference.model.ts'
import { SettingPreferenceTransformer } from '@/modules/setting/models/preference/settingPreference.transformer.ts'
import type { SettingPreferenceUpdateForm } from '@/modules/setting/models/preference/settingPreferenceUpdateForm.model.ts'

export class SettingPreferenceService {
  static async get(userUuid: UserUuid): Promise<SettingPreference> {
    const response = await viewPreferencesV1({ path: { userUuid } })

    return SettingPreferenceTransformer.fromDto(response.data)
  }

  static async update(userUuid: UserUuid, preference: SettingPreferenceUpdateForm): Promise<void> {
    await updatePreferencesV1({
      body: SettingPreferenceTransformer.toDto(preference),
      path: { userUuid },
    })
  }
}
