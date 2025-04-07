import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'

import { SettingsPreferenceService } from '@/modules/settings/api/services/settingsPreference.service.ts'
import type { SettingsPreference } from '@/modules/settings/models/preference/settingsPreference.model.ts'

export function usePreferenceQuery(): UseQueryReturnType<SettingsPreference> {
  return useQuery<SettingsPreference>({
    queryFn: () => {
      return SettingsPreferenceService.get()
    },
    queryKey: { preferences: {} },
  })
}
