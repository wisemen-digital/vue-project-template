import { PaginationOptions } from '@wisemen/vue-core'

import { base64Encode } from '@/utils/base64.util'

const DEFAULT_PAGE = 0
const DEFAULT_PER_PAGE = 20

type PaginationParams<TFilterSchema> = {
  limit: number
  page: number
} & Partial<TFilterSchema> & {
  column?: string
  direction?: 'asc' | 'desc'
}

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

  public buildEncoded(): string {
    return base64Encode(JSON.stringify(this.build()))
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

  public withPage(page: number): PaginationDtoBuilder<TFilterSchema> {
    this.paginationOptions.page = page
    return this
  }

  public withSize(perPage: number): PaginationDtoBuilder<TFilterSchema> {
    this.paginationOptions.limit = perPage
    return this
  }

  public withSort(sort: PaginationSort): PaginationDtoBuilder<TFilterSchema> {
    this.paginationOptions.column = sort.key
    this.paginationOptions.direction = sort.direction

    return this
  }
}
