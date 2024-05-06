import { PaginationOptions } from '@wisemen/vue-core'
import type { ComputedRef } from 'vue'

import {
  useQuery,
  type UseQueryReturnType,
} from '@/composables/query/query.composable'
import type { UserIndex } from '@/models/user/index/userIndex.model'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'
import type { PaginatedData } from '@/types/pagination.type'
import { QueryKey } from '@/types/query/queryKey.type'

import { UserService } from '../services/user.service'

export function useUserIndexQuery(
  paginationOptions: ComputedRef<PaginationOptions<UserIndexFilters>>,
): UseQueryReturnType<PaginatedData<UserIndex>> {
  return useQuery<PaginatedData<UserIndex>>({
    queryFn: () => {
      return UserService.getAll(paginationOptions.value)
    },
    queryKey: {
      key: QueryKey.USERS,
      params: {
        paginationOptions,
      },
    },
  })
}
