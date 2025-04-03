import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'

import { SettingPermissionService } from '@/modules/setting/api/services/settingPermission.service'
import type { SettingPermission } from '@/modules/setting/models/permission/settingPermission.model.ts'

export function useSettingPermissionQuery(): UseQueryReturnType<SettingPermission[]> {
  return useQuery<SettingPermission[]>({
    queryFn: () => {
      return SettingPermissionService.getAll()
    },
    queryKey: { permissions: {} },
  })
}
