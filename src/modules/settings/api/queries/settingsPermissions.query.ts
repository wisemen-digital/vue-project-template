import type {
  UseQueryReturnType,
} from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'

import type { Permission } from '@/models/permission/permission.model.ts'
import { SettingsPermissionsService } from '@/modules/settings/api/services/settingsPermissions.service.ts'

export function useSettingsPermissionsQuery(): UseQueryReturnType<Permission[]> {
  return useQuery<Permission[]>({
    queryFn: () => {
      return SettingsPermissionsService.getAll()
    },
    queryKey: {
      permissions: {},
    },
  })
}
