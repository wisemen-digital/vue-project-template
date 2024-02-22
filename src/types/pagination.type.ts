import type { ComputedRef } from 'vue'

export interface PaginationApiParams {
	perPage: ComputedRef<number>
	page: ComputedRef<number>
}

export interface PaginatedData<TSchema> {
	data: TSchema[]
	total: number
}
