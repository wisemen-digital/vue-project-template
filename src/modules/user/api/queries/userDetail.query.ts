import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'
import type { Ref } from 'vue'

import type { User } from '@/models/user/detail/user.model'
import type { UserUuid } from '@/models/user/userUuid.model'
import { UserService } from '@/modules/user/api/services/user.service'

export function useUserDetailQuery(userUuid: Ref<UserUuid>): UseQueryReturnType<User> {
  return useQuery<User>({
    queryFn: () => UserService.getByUuid(userUuid.value),
    queryKey: {
      userDetail: {
        userUuid,
      },
    },
  })
}
