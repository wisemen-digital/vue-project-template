import { PaginationOptions } from '@wisemen/vue-core'

const DEFAULT_PAGE = 0
const DEFAULT_PER_PAGE = 20

type PaginationParams<TFilterSchema> = {
  column?: string
  direction?: 'asc' | 'desc'
} & {
  limit: number
  page: number
} & Partial<TFilterSchema>

interface PaginationSort {
  direction: 'asc' | 'desc'
  key: string
}

export class PaginationDtoBuilder<TFilterSchema> {
  private paginationOptions: PaginationParams<TFilterSchema>

  constructor(paginationOptions?: PaginationOptions<TFilterSchema>) {
    this.paginationOptions = {
      limit: paginationOptions?.pagination.perPage ?? DEFAULT_PER_PAGE,
      page: paginationOptions?.pagination.page ?? DEFAULT_PAGE,
    } as PaginationParams<TFilterSchema>

    for (const key in paginationOptions?.filters) {
      this.withFilter(key as keyof TFilterSchema, paginationOptions?.filters[key])
    }
  }

  public build(): PaginationParams<TFilterSchema> {
    return this.paginationOptions
  }

  public withFilter<TKey extends keyof TFilterSchema>(
    key: TKey,
    value: TFilterSchema[TKey] | null | undefined,
  ): PaginationDtoBuilder<TFilterSchema> {
    if (value !== null && value !== '') {
      this.paginationOptions[key] = value as PaginationParams<TFilterSchema>[TKey]
    }
    return this
  }

  public withLimit(perPage: number): PaginationDtoBuilder<TFilterSchema> {
    this.paginationOptions.limit = perPage
    return this
  }

  public withPage(page: number): PaginationDtoBuilder<TFilterSchema> {
    this.paginationOptions.page = page
    return this
  }

  public withSort(sort: PaginationSort): PaginationDtoBuilder<TFilterSchema> {
    this.paginationOptions.column = sort.key
    this.paginationOptions.direction = sort.direction

    return this
  }
}
