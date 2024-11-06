import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import { UserService } from '@/api/services/user.service.ts'
import type { UserCreateForm } from '@/models/user/create/userCreateForm.model.ts'
import type { User } from '@/models/user/detail/user.model.ts'

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
