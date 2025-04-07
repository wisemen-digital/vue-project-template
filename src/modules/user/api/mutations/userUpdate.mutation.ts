import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { UserUuid } from '@/models/user/userUuid.model'
import type { SettingRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'
import { UserService } from '@/modules/user/api/services/user.service'

interface Params {
  userUuid: UserUuid
}

export function useUserUpdateRoleMutation(): UseMutationReturnType<SettingRoleUuid[], void, Params> {
  return useMutation<SettingRoleUuid[], void, Params>({
    queryFn: async ({
      body, params,
    }) => {
      await UserService.updateRoles(params.userUuid, body)
    },
    queryKeysToInvalidate: {
      userDetail: { userUuid: (params) => params.userUuid },
      userIndex: {},
    },
  })
}
