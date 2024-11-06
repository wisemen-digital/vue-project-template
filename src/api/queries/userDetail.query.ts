import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'
import { toValue } from 'vue'

import { UserService } from '@/api/services/user.service.ts'
import type { User } from '@/models/user/detail/user.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import type { RefOrGetter } from '@/types/reactivity.type.ts'

export function useUserDetailQuery(userUuid: RefOrGetter<UserUuid>): UseQueryReturnType<User> {
  return useQuery<User>({
    queryFn: () => UserService.getByUuid(toValue(userUuid)),
    queryKey: {
      userDetail: {
        userUuid,
      },
    },
  })
}
