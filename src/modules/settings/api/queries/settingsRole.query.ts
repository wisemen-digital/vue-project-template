import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'

import { SettingsRoleService } from '@/modules/settings/api/services/settingsRole.service.ts'
import type { SettingsRole } from '@/modules/settings/models/role/settingsRole.model.ts'

export function useSettingsRolesQuery(): UseQueryReturnType<SettingsRole[]> {
  return useQuery<SettingsRole[]>({
    queryFn: () => {
      return SettingsRoleService.getAll()
    },
    queryKey: { roles: {} },
  })
}
