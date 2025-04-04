import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'

import type { UserUuid } from '@/models/user/userUuid.model.ts'
import { SettingPreferenceService } from '@/modules/setting/api/services/settingPreference.service.ts'
import type { SettingPreference } from '@/modules/setting/models/preference/settingPreference.model.ts'

export function usePreferenceQuery(
  userUuid: ComputedRef<UserUuid | null>,
): UseQueryReturnType<SettingPreference> {
  return useQuery<SettingPreference>({
    isEnabled: userUuid.value !== null,
    queryFn: () => {
      if (userUuid.value === null) {
        throw new Error('User UUID is null')
      }

      return SettingPreferenceService.get(userUuid.value)
    },
    queryKey: { preference: { userUuid } },
  })
}
