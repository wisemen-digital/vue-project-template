import type {
  UseQueryReturnType,
} from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'

import type { Role } from '@/models/role/role.model.ts'
import { SettingsRolesService } from '@/modules/settings/api/services/settingsRoles.service.ts'

export function useSettingsRolesQuery(): UseQueryReturnType<Role[]> {
  return useQuery<Role[]>({
    queryFn: () => {
      return SettingsRolesService.getAll()
    },
    queryKey: {
      roles: {},
    },
  })
}
