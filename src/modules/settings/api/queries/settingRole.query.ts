import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'

import type { Role } from '@/models/role/role.model.ts'
import { SettingRoleService } from '@/modules/settings/api/services/settingRole.service'

export function useSettingRolesQuery(): UseQueryReturnType<Role[]> {
  return useQuery<Role[]>({
    queryFn: () => {
      return SettingRoleService.getAll()
    },
    queryKey: {
      roles: {},
    },
  })
}
