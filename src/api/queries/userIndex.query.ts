import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core'
import type {
  UseQueryReturnType,
} from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'

import { UserService } from '@/api/services/user.service.ts'
import type { UserIndex } from '@/models/user/index/userIndex.model.ts'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model.ts'

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
