import {
  updatePreferencesControllerUpdatePreferencesV1,
  viewPreferencesControllerViewPreferencesIndexV1,
} from '@/client'
import type { Preference } from '@/models/preference/preference.model.ts'
import { PreferenceTransformer } from '@/models/preference/preference.transformer.ts'
import type { PreferenceUpdateForm } from '@/models/preference/preferenceUpdateForm.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model.ts'

export class PreferenceService {
  static async get(userUuid: UserUuid): Promise<Preference> {
    const response = await viewPreferencesControllerViewPreferencesIndexV1({
      path: {
        userUuid,
      },
    })

    return PreferenceTransformer.fromDto(response.data)
  }

  static async update(userUuid: UserUuid, preference: PreferenceUpdateForm): Promise<void> {
    await updatePreferencesControllerUpdatePreferencesV1({
      body: PreferenceTransformer.toDto(preference),
      path: {
        userUuid,
      },
    })
  }
}
