import {
  useMutation,
  UseMutationReturnType,
} from '@wisemen/vue-core'

import type { UserCreateForm } from '@/models/user/create/userCreateForm.model'
import { User } from '@/models/user/detail/user.model'
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
