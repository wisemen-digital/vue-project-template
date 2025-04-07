import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import { SettingsRoleService } from '@/modules/settings/api/services/settingsRole.service.ts'

export function useSettingsRoleCreateMutation(): UseMutationReturnType<string, void> {
  return useMutation<string, void>({
    queryFn: async ({ body }) => {
      await SettingsRoleService.create(body)
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
