import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import { SettingRoleService } from '@/modules/setting/api/services/settingRole.service'
import type { SettingRolePermissionUpdateForm } from '@/modules/setting/models/role/settingRolePermissionUpdateForm.model.ts'

export function useSettingRoleBulkUpdateMutation(): UseMutationReturnType<SettingRolePermissionUpdateForm, void> {
  return useMutation<SettingRolePermissionUpdateForm, void>({
    queryFn: async ({ body }) => {
      await SettingRoleService.updateRolesInBulk(body)
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
