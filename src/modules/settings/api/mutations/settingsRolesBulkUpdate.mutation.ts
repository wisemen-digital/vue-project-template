import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { Role } from '@/models/role/role.model.ts'
import { SettingsRolesService } from '@/modules/settings/api/services/settingsRoles.service.ts'

export function useSettingsRolesBulkUpdateMutation(): UseMutationReturnType<Role[], void> {
  return useMutation<Role[], void>({
    queryFn: async ({ body }) => {
      await SettingsRolesService.updateRolesBulk(body)
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
