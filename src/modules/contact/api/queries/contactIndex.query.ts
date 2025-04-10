import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core'
import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'

import type { ContactIndex } from '@/models/contact/index/contactIndex.model'
import type { ContactIndexPagination } from '@/models/contact/index/contactIndexPagination.model'
import { ContactService } from '@/modules/contact/api/services/contact.service'

export function useContactIndexQuery(
  paginationOptions: ComputedRef<PaginationOptions<ContactIndexPagination>>,
): UseQueryReturnType<PaginatedData<ContactIndex>> {
  return useQuery<PaginatedData<ContactIndex>>({
    queryFn: () => {
      return ContactService.getAll(paginationOptions.value)
    },
    queryKey: { contactIndex: { paginationOptions } },
  })
}
