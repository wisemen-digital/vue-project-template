import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { RoleUuid } from '@/models/role/roleUuid.model.ts'
import { SettingRoleService } from '@/modules/settings/api/services/settingRole.service'

export function useSettingRoleDeleteMutation(): UseMutationReturnType<RoleUuid, void> {
  return useMutation<RoleUuid, void>({
    queryFn: async ({ body }) => {
      await SettingRoleService.delete(body)
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
