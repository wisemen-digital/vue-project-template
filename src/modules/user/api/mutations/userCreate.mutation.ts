import type { UseMutationReturnType } from '@/composables/mutation/mutation.composable'
import { useMutation } from '@/composables/mutation/mutation.composable'
import type { UserCreateForm } from '@/models/user/create/userCreateForm.model'
import { User } from '@/models/user/detail/user.model'
import { QueryKey } from '@/types/query/queryKey.type'

import { UserService } from '../services/user.service'

export function useUserCreateMutation(): UseMutationReturnType<UserCreateForm, User> {
  return useMutation<UserCreateForm, User>({
    queryFn: async ({ body }) => {
      return await UserService.create(body)
    },
    queryKeysToInvalidate: [
      {
        exact: false,
        key: QueryKey.USERS,
      },
    ],
  })
}
