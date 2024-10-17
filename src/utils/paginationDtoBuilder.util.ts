import type { PaginationOptions } from '@wisemen/vue-core'

const DEFAULT_OFFSET = 0
const DEFAULT_LIMIT = 20

// @ts-expect-error TODO: change page back to offset

type PaginationParams<TFilterSchema> = {
  filters: Partial<TFilterSchema>
  sort?: {
    field: string
    order: 'asc' | 'desc'
  }[]
} & {
  pagination: {
    limit: number
    page: number
  }
}

interface PaginationSort {
  direction: 'asc' | 'desc'
  key: string
}

export class PaginationDtoBuilder<TFilterSchema> {
  private paginationOptions: PaginationParams<TFilterSchema>

  constructor(paginationOptions?: PaginationOptions<TFilterSchema>) {
    const limit = (paginationOptions?.pagination.perPage ?? DEFAULT_LIMIT)
    const offset = (paginationOptions?.pagination.page ?? DEFAULT_OFFSET) * limit

    const allFilters = {
      ...paginationOptions?.filters ?? {},
      ...paginationOptions?.staticFilters ?? {},
    }

    this.paginationOptions = {
      pagination: {
        limit,
        page: offset,
      },
    } as PaginationParams<TFilterSchema>

    Object.entries(allFilters).forEach(([
      key,
      value,
    ]) => {
      this.withFilter(key as keyof TFilterSchema, value as TFilterSchema[keyof TFilterSchema])
    })

    if (paginationOptions?.sort !== undefined) {
      this.withSort({
        direction: paginationOptions.sort.direction,
        key: paginationOptions.sort.key,
      })
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
      this.paginationOptions.filters = {
        ...this.paginationOptions.filters,
        [key]: value,
      }
    }

    return this
  }

  public withLimit(limit: number): PaginationDtoBuilder<TFilterSchema> {
    this.paginationOptions.pagination.limit = limit

    return this
  }

  public withOffset(offset: number): PaginationDtoBuilder<TFilterSchema> {
    this.paginationOptions.pagination.page = offset

    return this
  }

  public withSort(sort: PaginationSort): PaginationDtoBuilder<TFilterSchema> {
    this.paginationOptions.sort = [
      {
        field: sort.key,
        order: sort.direction,
      },
    ]

    return this
  }
}
