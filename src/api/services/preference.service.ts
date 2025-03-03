import {
  updatePreferencesControllerUpdatePreferencesV1,
  viewPreferencesControllerViewPreferencesIndexV1,
} from '@/client'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import type { SettingPreference } from '@/modules/setting/models/preference/settingPreference.model.ts'
import { SettingPreferenceTransformer } from '@/modules/setting/models/preference/settingPreference.transformer.ts'
import type { PreferenceUpdateForm } from '@/modules/setting/models/preference/settingPreferenceUpdateForm.model.ts'

export class PreferenceService {
  static async get(userUuid: UserUuid): Promise<SettingPreference> {
    const response = await viewPreferencesControllerViewPreferencesIndexV1({
      path: {
        userUuid,
      },
    })

    return SettingPreferenceTransformer.fromDto(response.data)
  }

  static async update(userUuid: UserUuid, preference: PreferenceUpdateForm): Promise<void> {
    await updatePreferencesControllerUpdatePreferencesV1({
      body: SettingPreferenceTransformer.toDto(preference),
      path: {
        userUuid,
      },
    })
  }
}
