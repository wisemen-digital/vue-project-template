import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'
import { toValue } from 'vue'

import type { User } from '@/models/user/detail/user.model'
import type { UserUuid } from '@/models/user/userUuid.model'
import { UserService } from '@/modules/user/api/services/user.service'
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
