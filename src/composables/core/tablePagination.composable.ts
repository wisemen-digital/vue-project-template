import { useRouteQuery } from '@vueuse/router'
import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, shallowRef, toValue, watch } from 'vue'

import { base64Decode, base64Encode } from '@/utils/base64.util'

export type SortDirection = 'asc' | 'desc'

type PaginationSort = Record<string, SortDirection>

type PaginationFilters<TFilters> = {
	[K in keyof TFilters]: unknown
}

export interface PageChangeEvent {
	page: number
	perPage: number
}

export type FilterChangeEvent<TFilters> = {
	[K in keyof TFilters]: unknown
}

export type SortChangeEvent = Record<string, SortDirection>

export interface PaginationOptions<TFilters> {
	sort?: PaginationSort
	filters?: PaginationFilters<TFilters>
	pagination: {
		page: number
		perPage: number
	}
}

interface UseTablePaginationOptions<TFilters> {
	/**
	 * Identifier used to store pagination options in a route query.
	 */
	id: string // TODO: Enum?
	/**
	 * Default pagination options. If not provided, the default options will be used.
	 */
	defaultPaginationOptions?: MaybeRefOrGetter<PaginationOptions<TFilters>> | null
}

interface UseTablePaginationReturnType<TFilters> {
	paginationOptions: ComputedRef<PaginationOptions<TFilters>>
	handlePageChange: (event: PageChangeEvent) => void
	handleFilterChange: (event: FilterChangeEvent<TFilters>) => void
	handleSortChange: (event: SortChangeEvent) => void
}

const DEFAULT_PAGINATION_OPTIONS = {
	sort: {},
	filters: {},
	pagination: {
		page: 1,
		perPage: 20,
	},
} as const

export function useTablePagination<TFilters>({
	id,
	defaultPaginationOptions = null,
}: UseTablePaginationOptions<TFilters>): UseTablePaginationReturnType<TFilters> {
	const routeQuery = useRouteQuery<string | undefined>(id)
	const paginationOptions = shallowRef<PaginationOptions<TFilters>>(getDefaultPaginationOptions())

	function mergePaginationOptions(
		userOptions: PaginationOptions<TFilters>,
		currentOptions: PaginationOptions<TFilters>
	): PaginationOptions<TFilters> {
		return {
			pagination: {
				...currentOptions.pagination,
				...userOptions.pagination,
			},
			filters: {
				...currentOptions.filters,
				...userOptions.filters,
			} as PaginationFilters<TFilters>,
			sort: {
				...currentOptions.sort,
				...userOptions.sort,
			},
		}
	}

	function getRouteQueryPaginationOptions(): PaginationOptions<TFilters> | null {
		const searchParams = new URLSearchParams(window.location.search)
		const paginationOptionsQuery = searchParams.get(id)

		if (paginationOptionsQuery === null) {
			return null
		}

		return JSON.parse(base64Decode(paginationOptionsQuery))
	}

	function getDefaultPaginationOptions(): PaginationOptions<TFilters> {
		const routeQueryPaginationOptions = getRouteQueryPaginationOptions()

		if (routeQueryPaginationOptions !== null) {
			return routeQueryPaginationOptions
		}

		if (defaultPaginationOptions !== null) {
			return mergePaginationOptions(
				toValue(defaultPaginationOptions),
				DEFAULT_PAGINATION_OPTIONS as PaginationOptions<TFilters>
			)
		}

		return structuredClone(DEFAULT_PAGINATION_OPTIONS as PaginationOptions<TFilters>)
	}

	function handlePageChange(event: PageChangeEvent): void {
		paginationOptions.value = {
			...paginationOptions.value,
			pagination: event,
		}
	}

	function handleFilterChange(event: FilterChangeEvent<TFilters>): void {
		paginationOptions.value = {
			...paginationOptions.value,
			filters: event,
		}
	}

	function handleSortChange(event: SortChangeEvent): void {
		paginationOptions.value = {
			...paginationOptions.value,
			sort: event,
		}
	}

	watch(paginationOptions, (newPaginationoptions) => {
		routeQuery.value = base64Encode(JSON.stringify(newPaginationoptions))
	})

	return {
		paginationOptions: computed<PaginationOptions<TFilters>>(() => paginationOptions.value),
		handleFilterChange,
		handlePageChange,
		handleSortChange,
	}
}
