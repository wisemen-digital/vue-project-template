import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, shallowRef, toValue } from 'vue'

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
	sort?: PaginationSort | null
	filters?: PaginationFilters<TFilters>
	pagination: {
		page: number
		perPage: number
		total?: number
	}
}

interface CustomPaginationOptions<TFilters> {
	sort?: PaginationSort | null
	filters?: PaginationFilters<TFilters>
	pagination?: {
		page: number
		perPage: number
	}
}

interface UseTablePaginationOptions<TFilters> {
	/**
	 * Identifier used to store pagination options in a route query.
	 */
	id: string
	/**
	 * Default pagination options. If not provided, the default options will be used.
	 */
	defaultPaginationOptions?: MaybeRefOrGetter<CustomPaginationOptions<TFilters>> | null
}

interface UseTablePaginationReturnType<TFilters> {
	paginationOptions: ComputedRef<PaginationOptions<TFilters>>
	handlePageChange: (event: PageChangeEvent) => void
	handleFilterChange: (event: FilterChangeEvent<TFilters>) => void
	handleSortChange: (event: SortChangeEvent) => void
	setPagination: (options: PaginationOptions<TFilters>['pagination']) => void
}

const DEFAULT_PAGINATION_OPTIONS: PaginationOptions<unknown> = {
	sort: null,
	filters: {},
	pagination: {
		page: 1,
		perPage: 20,
		total: undefined,
	},
}

export function useTablePagination<TFilters>({
	id,
	defaultPaginationOptions = null,
}: UseTablePaginationOptions<TFilters>): UseTablePaginationReturnType<TFilters> {
	const paginationOptions = shallowRef<PaginationOptions<TFilters>>(getDefaultPaginationOptions())

	function mergePaginationOptions(
		defaultOptions: CustomPaginationOptions<TFilters>,
		currentOptions: PaginationOptions<TFilters>
	): PaginationOptions<TFilters> {
		// TODO: deep merge
		return {
			...defaultOptions,
			...currentOptions,
		}
	}

	function getDefaultPaginationOptions(): PaginationOptions<TFilters> {
		if (defaultPaginationOptions !== null) {
			const mergedOptions = mergePaginationOptions(
				toValue(defaultPaginationOptions),
				DEFAULT_PAGINATION_OPTIONS as PaginationOptions<TFilters>
			)
			return mergedOptions
		}

		const defaultPaginationOptionsCopy = structuredClone(DEFAULT_PAGINATION_OPTIONS as PaginationOptions<TFilters>)
		return defaultPaginationOptionsCopy
	}

	function setPagination(options: PaginationOptions<TFilters>['pagination']): void {
		paginationOptions.value = {
			...paginationOptions.value,
			pagination: options,
		}
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

	return {
		paginationOptions: computed<PaginationOptions<TFilters>>(() => paginationOptions.value),
		handleFilterChange,
		handlePageChange,
		handleSortChange,
		setPagination,
	}
}
