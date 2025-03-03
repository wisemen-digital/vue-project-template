import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'

import { SettingRoleService } from '@/modules/settings/api/services/settingRole.service'
import type { SettingRole } from '@/modules/settings/models/setting-role/settingRole.model.ts'

export function useSettingRolesQuery(): UseQueryReturnType<SettingRole[]> {
  return useQuery<SettingRole[]>({
    queryFn: () => {
      return SettingRoleService.getAll()
    },
    queryKey: {
      roles: {},
    },
  })
}
