import type { ComputedRef } from 'vue'
import {
  computed,
  reactive,
  watch,
} from 'vue'

import type { PaginationApiParams } from '@/types/pagination.type'

import type { PaginationOptions } from './tablePagination.composable'

export function usePaginationOptionsToApiParams(
  paginationOptions: ComputedRef<PaginationOptions<unknown>>,
): PaginationApiParams {
  const apiParams = reactive<PaginationApiParams>({
    page: computed<number>(() => paginationOptions.value.pagination.page + 1), // Test API is 1-based, we are 0-based
    perPage: computed<number>(() => paginationOptions.value.pagination.perPage),
  })

  watch(
    () => paginationOptions.value.filters,
    () => {
      Object.entries(paginationOptions.value.filters ?? {}).forEach(([
        key,
        value,
      ]) => {
        apiParams[key] = value
      })
    },
    {
      immediate: true,
    },
  )

  watch(
    () => paginationOptions.value.sort,
    (sortState) => {
      if (sortState === undefined) {
        return
      }

      const [
        key,
        direction,
      ] = Object.entries(sortState)[0] ?? []

      apiParams.orderBy = key
      apiParams.orderDirection = direction
    },
    {
      immediate: true,
    },
  )

  // We need to cast this because of computed in reactive
  return apiParams as unknown as PaginationApiParams
}
