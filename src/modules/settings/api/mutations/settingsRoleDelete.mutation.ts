import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import { SettingsRoleService } from '@/modules/settings/api/services/settingsRole.service.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

export function useSettingsRoleDeleteMutation(): UseMutationReturnType<SettingsRoleUuid, void> {
  return useMutation<SettingsRoleUuid, void>({
    queryFn: async ({ body }) => {
      await SettingsRoleService.delete(body)
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
