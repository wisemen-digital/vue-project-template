import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'

import { SettingsRoleService } from '@/modules/settings/api/services/settingsRole.service.ts'
import type { SettingRole } from '@/modules/settings/models/role/settingsRole.model.ts'

export function useSettingRolesQuery(): UseQueryReturnType<SettingRole[]> {
  return useQuery<SettingRole[]>({
    queryFn: () => {
      return SettingsRoleService.getAll()
    },
    queryKey: { roles: {} },
  })
}
