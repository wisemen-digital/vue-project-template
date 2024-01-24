import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, reactive, ref } from 'vue'
import type { z } from 'zod'

import type { QueryKeys } from '@/models/core/queryKey.model'

import type { Meta } from './paginatedQuery.composable'
import { usePaginatedQuery } from './paginatedQuery.composable'

export interface UseTableQueryReturnType<T extends z.ZodType> {
	data: ComputedRef<z.infer<T>[]>
	meta: ComputedRef<Meta | null>
	nextPage: () => Promise<void>
	setSort: (key: string, direction: 'asc' | 'desc') => void
}

interface UseTableOptions<T extends z.ZodType> {
	url: string
	responseSchema: T
	queryKeys: {
		[K in keyof QueryKeys]: QueryKeys[K] extends void
			? {
					key: K
			  }
			: {
					key: K
					params: MaybeRefOrGetter<QueryKeys[K]>
			  }
	}[keyof QueryKeys][]
}

interface SortState {
	column: string
	direction: 'asc' | 'desc'
}

interface QueryFnParams {
	column: ComputedRef<string | undefined>
	direction: ComputedRef<string | undefined>
}

const sortState = ref<SortState | null>(null)

/**
 * Wrapper around usePaginatedQuery to provide table functionality
 */
export function useTableQuery<T extends z.ZodType>({
	url,
	responseSchema,
	queryKeys,
}: UseTableOptions<T>): UseTableQueryReturnType<T> {
	const { data, meta, nextPage } = usePaginatedQuery({
		url,
		responseSchema,
		queryKeys,
		config: {
			params: reactive<QueryFnParams>({
				column: computed<string | undefined>(() => sortState.value?.column),
				direction: computed<string | undefined>(() => sortState.value?.direction),
			}),
		},
	})

	function setSort(key: string, direction: 'asc' | 'desc'): void {
		sortState.value = {
			column: key,
			direction,
		}
	}

	return {
		meta,
		data: computed<z.infer<T>[]>(() => (data.value ?? []) as z.infer<T>[]),
		setSort,
		nextPage,
	}
}
