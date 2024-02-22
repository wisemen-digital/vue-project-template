import type { ComputedRef } from 'vue'
import { computed, reactive } from 'vue'

import type { PaginationApiParams } from '@/types/pagination.type'

import type { PaginationOptions } from './tablePagination.composable'

export function usePaginationOptionsToApiParams<T>(
	paginationOptions: ComputedRef<PaginationOptions<T>>
): PaginationApiParams {
	return reactive<{
		perPage: ComputedRef<number>
		page: ComputedRef<number>
	}>({
		perPage: computed<number>(() => paginationOptions.value.pagination.perPage),
		page: computed<number>(() => paginationOptions.value.pagination.page + 1), // Test API is 1-based, we are 0-based
	})
}
