import { PaginationOptions } from '@wisemen/vue-core'

const DEFAULT_OFFSET = 10
const DEFAULT_LIMIT = 10

type PaginationParams<TFilterSchema> = {
  column?: string
  direction?: 'asc' | 'desc'
} & {
  limit: number
  offset: number
} & Partial<TFilterSchema>

interface PaginationSort {
  direction: 'asc' | 'desc'
  key: string
}

export class PaginationDtoBuilder<TFilterSchema> {
  private paginationOptions: PaginationParams<TFilterSchema>

  constructor(paginationOptions?: PaginationOptions<TFilterSchema>) {
    this.paginationOptions = {
      limit: paginationOptions?.pagination.perPage ?? DEFAULT_LIMIT,
      offset: paginationOptions?.pagination.page ?? DEFAULT_OFFSET,
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

  public withLimit(limit: number): PaginationDtoBuilder<TFilterSchema> {
    this.paginationOptions.limit = limit
    return this
  }

  public withOffset(offset: number): PaginationDtoBuilder<TFilterSchema> {
    this.paginationOptions.offset = offset
    return this
  }

  public withSort(sort: PaginationSort): PaginationDtoBuilder<TFilterSchema> {
    this.paginationOptions.column = sort.key
    this.paginationOptions.direction = sort.direction

    return this
  }
}
