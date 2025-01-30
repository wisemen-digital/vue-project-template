import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { SettingRoleBulkUpdateForm } from '@/models/setting-role/settingRoleBulkUpdateForm.model.ts'
import { SettingRoleService } from '@/modules/settings/api/services/settingRole.service'

export function useSettingRoleBulkUpdateMutation(): UseMutationReturnType<SettingRoleBulkUpdateForm, void> {
  return useMutation<SettingRoleBulkUpdateForm, void>({
    queryFn: async ({ body }) => {
      await SettingRoleService.updateRolesInBulk(body)
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
