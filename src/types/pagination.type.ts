import type { ComputedRef } from 'vue'

export type PaginationApiParams = Record<string, ComputedRef<unknown> | unknown> & {
	page: ComputedRef<number>
	perPage: ComputedRef<number>
}

export interface PaginatedData<TSchema> {
	data: TSchema[]
	total: number
}
