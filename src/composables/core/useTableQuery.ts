import type { z } from 'zod'

import type { QueryKey } from '@/models'

import type { Meta } from './usePaginatedQuery'
import { usePaginatedQuery } from './usePaginatedQuery'

export interface UseTableQueryReturnType<T extends z.ZodType> {
	data: ComputedRef<z.infer<T>[]>
	meta: ComputedRef<Meta | null>
	nextPage: () => Promise<void>
	setSort: (key: string, direction: 'asc' | 'desc') => void
}

interface UseTableOptions<T extends z.ZodType> {
	url: string
	responseSchema: T
	queryKey: QueryKey[]
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
	queryKey,
}: UseTableOptions<T>): UseTableQueryReturnType<T> {
	const { data, meta, nextPage } = usePaginatedQuery({
		url,
		responseSchema,
		queryKey,
		config: {
			params: reactive<QueryFnParams>({
				column: computed<string | undefined>(() => sortState.value?.column),
				direction: computed<string | undefined>(() => sortState.value?.direction),
			}),
		},
	})

	const setSort = (key: string, direction: 'asc' | 'desc'): void => {
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
