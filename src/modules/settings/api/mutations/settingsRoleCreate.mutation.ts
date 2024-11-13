import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import { SettingsRolesService } from '@/modules/settings/api/services/settingsRoles.service.ts'

export function useSettingsRoleCreateMutation(): UseMutationReturnType<string, void> {
  return useMutation<string, void>({
    queryFn: async ({ body }) => {
      await SettingsRolesService.create(body)
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
