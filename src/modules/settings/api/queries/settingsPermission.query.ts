import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'

import { SettingsPermissionService } from '@/modules/settings/api/services/settingsPermission.service.ts'
import type { SettingsPermission } from '@/modules/settings/models/permission/settingsPermission.model.ts'

export function useSettingsPermissionQuery(): UseQueryReturnType<SettingsPermission[]> {
  return useQuery<SettingsPermission[]>({
    queryFn: () => {
      return SettingsPermissionService.getAll()
    },
    queryKey: { permissions: {} },
  })
}
