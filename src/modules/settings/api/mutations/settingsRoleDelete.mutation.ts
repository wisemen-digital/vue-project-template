import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { RoleUuid } from '@/models/role/roleUuid.model.ts'
import { SettingsRolesService } from '@/modules/settings/api/services/settingsRoles.service.ts'

export function useSettingsRoleDeleteMutation(): UseMutationReturnType<RoleUuid, void> {
  return useMutation<RoleUuid, void>({
    queryFn: async ({ body }) => {
      await SettingsRolesService.delete(body)
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
