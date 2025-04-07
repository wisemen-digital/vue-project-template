import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'

import { SettingsPermissionService } from '@/modules/settings/api/services/settingsPermission.service.ts'
import type { SettingPermission } from '@/modules/settings/models/permission/settingsPermission.model.ts'

export function useSettingPermissionQuery(): UseQueryReturnType<SettingPermission[]> {
  return useQuery<SettingPermission[]>({
    queryFn: () => {
      return SettingsPermissionService.getAll()
    },
    queryKey: { permissions: {} },
  })
}
