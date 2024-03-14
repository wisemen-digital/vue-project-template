import type { UseMutationReturnType } from '@/composables/mutation/mutation.composable'
import { useMutation } from '@/composables/mutation/mutation.composable'
import type { User } from '@/models/users/detail/user.model'
import type { UserUpdateForm } from '@/models/users/update/userUpdateForm.model'
import type { UserUuid } from '@/models/users/userUuid.model'
import { QueryKey } from '@/types/query/queryKey.type'

import { userService } from '../services/user.service'

interface Params extends Record<string, string> {
  userUuid: UserUuid
}

export function useUserUpdateMutation(): UseMutationReturnType<UserUpdateForm, User, Params> {
  return useMutation<UserUpdateForm, User, Params>({
    queryFn: async ({ body, params }) => {
      return await userService.update(params.userUuid, body)
    },
    queryKeysToInvalidate: [{
      exact: false,
      key: QueryKey.USERS,
    }, {
      exact: true,
      key: QueryKey.USERS_DETAIL,
      params: {
        userUuid: user => user.uuid,
      },
    }],
  })
}
