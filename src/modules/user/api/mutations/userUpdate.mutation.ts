import type { UseMutationReturnType } from '@/composables/mutation/mutation.composable'
import { useMutation } from '@/composables/mutation/mutation.composable'
import type { User } from '@/models/user/detail/user.model'
import type { UserUpdateForm } from '@/models/user/update/userUpdateForm.model'
import type { UserUuid } from '@/models/user/userUuid.model'
import { QueryKey } from '@/types/query/queryKey.type'

import { UserService } from '../services/user.service'

interface Params extends Record<string, string> {
  userUuid: UserUuid
}

export function useUserUpdateMutation(): UseMutationReturnType<UserUpdateForm, User, Params> {
  return useMutation<UserUpdateForm, User, Params>({
    queryFn: async ({ body, params }) => {
      return await UserService.update(params.userUuid, body)
    },
    queryKeysToInvalidate: [
      {
        exact: false,
        key: QueryKey.USERS,
      },
      {
        exact: true,
        key: QueryKey.USER_DETAIL,
        params: {
          userUuid: user => user.uuid,
        },
      },
    ],
  })
}
