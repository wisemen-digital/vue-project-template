import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'

import { SettingsPreferenceService } from '@/modules/settings/api/services/settingsPreference.service.ts'
import type { SettingPreference } from '@/modules/settings/models/preference/settingsPreference.model.ts'

export function usePreferenceQuery(): UseQueryReturnType<SettingPreference> {
  return useQuery<SettingPreference>({
    queryFn: () => {
      return SettingsPreferenceService.get()
    },
    queryKey: { preferences: {} },
  })
}
