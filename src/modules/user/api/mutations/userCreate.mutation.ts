import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { UserCreateForm } from '@/models/user/create/userCreateForm.model'
import type { User } from '@/models/user/detail/user.model'
import { UserService } from '@/modules/user/api/services/user.service'

export function useUserCreateMutation(): UseMutationReturnType<UserCreateForm, User> {
  return useMutation<UserCreateForm, User>({
    queryFn: async ({ body }) => {
      return await UserService.create(body)
    },
    queryKeysToInvalidate: {
      userIndex: {},
    },
  })
}
