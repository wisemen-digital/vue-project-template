import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'

import type { SettingRole } from '@/models/setting-role/role.model.ts'
import { SettingRoleService } from '@/modules/settings/api/services/settingRole.service'

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
