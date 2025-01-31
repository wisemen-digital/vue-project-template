import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { RoleUuid } from '@/models/setting-role/roleUuid.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model'
import { UserService } from '@/modules/user/api/services/user.service'

interface Params {
  userUuid: UserUuid
}

export function useUserUpdateRoleMutation(): UseMutationReturnType<RoleUuid[], void, Params> {
  return useMutation<RoleUuid[], void, Params>({
    queryFn: async ({ body, params }) => {
      await UserService.updateRoles(params.userUuid, body)
    },
    queryKeysToInvalidate: {
      userDetail: {
        userUuid: (params) => params.userUuid,
      },
      userIndex: {},
    },
  })
}
