import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import { SettingRoleService } from '@/modules/settings/api/services/settingRole.service'

export function useSettingRoleCreateMutation(): UseMutationReturnType<string, void> {
  return useMutation<string, void>({
    queryFn: async ({ body }) => {
      await SettingRoleService.create(body)
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
