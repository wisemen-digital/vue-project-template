import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import { UserService } from '@/api/services/user.service.ts'
import type { User } from '@/models/user/detail/user.model.ts'
import type { UserUpdateForm } from '@/models/user/update/userUpdateForm.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model.ts'

interface Params {
  userUuid: UserUuid
}

export function useUserUpdateMutation(): UseMutationReturnType<UserUpdateForm, User, Params> {
  return useMutation<UserUpdateForm, User, Params>({
    queryFn: async ({ body, params }) => {
      return await UserService.update(params.userUuid, body)
    },
    queryKeysToInvalidate: {
      userDetail: {
        userUuid: (params) => params.userUuid,
      },
      userIndex: {},
    },
  })
}
