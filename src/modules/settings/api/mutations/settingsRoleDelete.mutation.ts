import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import { SettingsRoleService } from '@/modules/settings/api/services/settingsRole.service.ts'
import type { SettingRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

export function useSettingRoleDeleteMutation(): UseMutationReturnType<SettingRoleUuid, void> {
  return useMutation<SettingRoleUuid, void>({
    queryFn: async ({ body }) => {
      await SettingsRoleService.delete(body)
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
