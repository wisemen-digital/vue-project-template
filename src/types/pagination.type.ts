export interface PaginationApiParams {
	perPage: number
	page: number
}

export interface PaginatedData<TSchema> {
	data: TSchema[]
	total: number
}
