import { Ref } from 'vue'

import type { UseQueryReturnType } from '@/composables/query/query.composable'
import { useQuery } from '@/composables/query/query.composable'
import type { User } from '@/models/user/detail/user.model'
import type { UserUuid } from '@/models/user/userUuid.model'
import { QueryKey } from '@/types/query/queryKey.type'

import { UserService } from '../services/user.service'

export function useUserDetailQuery(userUuid: Ref<UserUuid>): UseQueryReturnType<User> {
  return useQuery<User>({
    queryFn: () => UserService.getByUuid(userUuid.value),
    queryKey: {
      key: QueryKey.USER_DETAIL,
      params: {
        userUuid,
      },
    },
  })
}
