import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'

import { GlobalSearchService } from '@/api/global-search/services/globalSearch.service.ts'
import type { GlobalSearchIndex } from '@/models/global-search/globalSearchIndex.model.ts'

export function useGlobalSearchIndexQuery(
  search: ComputedRef<string>,
): UseQueryReturnType<GlobalSearchIndex[]> {
  return useQuery<GlobalSearchIndex[]>({
    queryFn: async () => {
      if (search.value.length === 0) {
        return []
      }

      return await GlobalSearchService.find(search.value)
    },
    queryKey: { globalSearchIndex: { search } },
  })
}
