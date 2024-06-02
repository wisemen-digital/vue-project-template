import {
  PaginationOptions,
  useQuery,
  UseQueryReturnType,
} from '@wisemen/vue-core'
import type { ComputedRef } from 'vue'

import type { UserIndex } from '@/models/user/index/userIndex.model'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'
import { UserService } from '@/modules/user/api/services/user.service'
import type { PaginatedData } from '@/types/pagination.type'

export function useUserIndexQuery(
  paginationOptions: ComputedRef<PaginationOptions<UserIndexFilters>>,
): UseQueryReturnType<PaginatedData<UserIndex>> {
  return useQuery<PaginatedData<UserIndex>>({
    queryFn: () => {
      return UserService.getAll(paginationOptions.value)
    },
    queryKey: {
      userIndex: {
        paginationOptions,
      },
    },
  })
}
