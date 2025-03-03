import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import { SettingRoleService } from '@/modules/setting/api/services/settingRole.service'
import type { SettingRoleUuid } from '@/modules/setting/models/setting-role/settingRoleUuid.model.ts'

export function useSettingRoleDeleteMutation(): UseMutationReturnType<SettingRoleUuid, void> {
  return useMutation<SettingRoleUuid, void>({
    queryFn: async ({ body }) => {
      await SettingRoleService.delete(body)
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
