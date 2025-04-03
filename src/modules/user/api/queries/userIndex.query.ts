import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core'
import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'

import type { UserIndex } from '@/models/user/index/userIndex.model'
import type { UserIndexPagination } from '@/models/user/index/userIndexPagination.model.ts'
import { UserService } from '@/modules/user/api/services/user.service'

export function useUserIndexQuery(
  paginationOptions: ComputedRef<PaginationOptions<UserIndexPagination>>,
): UseQueryReturnType<PaginatedData<UserIndex>> {
  return useQuery<PaginatedData<UserIndex>>({
    queryFn: () => {
      return UserService.getAll(paginationOptions.value)
    },
    queryKey: { userIndex: { paginationOptions } },
  })
}
