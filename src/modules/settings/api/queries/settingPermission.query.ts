import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'

import type { Permission } from '@/models/permission/permission.model.ts'
import { SettingPermissionService } from '@/modules/settings/api/services/settingPermission.service'

export function useSettingPermissionQuery(): UseQueryReturnType<Permission[]> {
  return useQuery<Permission[]>({
    queryFn: () => {
      return SettingPermissionService.getAll()
    },
    queryKey: {
      permissions: {},
    },
  })
}