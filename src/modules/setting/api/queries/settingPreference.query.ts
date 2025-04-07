import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'

import { SettingPreferenceService } from '@/modules/setting/api/services/settingPreference.service.ts'
import type { SettingPreference } from '@/modules/setting/models/preference/settingPreference.model.ts'

export function usePreferenceQuery(): UseQueryReturnType<SettingPreference> {
  return useQuery<SettingPreference>({
    queryFn: () => {
      return SettingPreferenceService.get()
    },
    queryKey: { preferences: {} },
  })
}
