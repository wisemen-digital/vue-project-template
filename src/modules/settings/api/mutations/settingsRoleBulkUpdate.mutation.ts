import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import { SettingsRoleService } from '@/modules/settings/api/services/settingsRole.service.ts'
import type { SettingRolePermissionUpdateForm } from '@/modules/settings/models/role/settingsRolePermissionUpdateForm.model.ts'

export function useSettingRoleBulkUpdateMutation(): UseMutationReturnType<SettingRolePermissionUpdateForm, void> {
  return useMutation<SettingRolePermissionUpdateForm, void>({
    queryFn: async ({ body }) => {
      await SettingsRoleService.updateRolesInBulk(body)
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
