import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { Role } from '@/models/role/role.model.ts'
import { SettingRoleService } from '@/modules/settings/api/services/settingRole.service'

export function useSettingRoleBulkUpdateMutation(): UseMutationReturnType<Role[], void> {
  return useMutation<Role[], void>({
    queryFn: async ({ body }) => {
      await SettingRoleService.updateRolesInBulk(body)
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
