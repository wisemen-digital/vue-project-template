import { PaginationOptions } from '@wisemen/vue-core'
import type { ComputedRef } from 'vue'

import type { UseQueryReturnType } from '@/composables/query/query.composable'
import { useQuery } from '@/composables/query/query.composable'
import { TIME } from '@/constants/time.constant'
import type { UserIndex } from '@/models/users/index/userIndex.model'
import type { UserIndexFilters } from '@/models/users/index/userIndexFilters.model'
import type { PaginatedData } from '@/types/pagination.type'
import { QueryKey } from '@/types/query/queryKey.type'

import { userService } from '../services/user.service'

export function useUsersIndexQuery(
  paginationOptions: ComputedRef<PaginationOptions<UserIndexFilters>>,
): UseQueryReturnType<PaginatedData<UserIndex>> {
  return useQuery<PaginatedData<UserIndex>>({
    queryFn: () => {
      return userService.getAll(paginationOptions)
    },
    queryKey: {
      key: QueryKey.USERS,
      // params: usePaginationOptionsToApiParams(paginationOptions),
      // TODO: Implement pagination builder
      params: {} as any,
    },
    staleTime: TIME.FIVE_MINUTES,
  })
}
