import { PaginationOptions } from '@wisemen/vue-core'

import { base64Encode } from '@/utils/base64.util.ts'

type SortKey<TFilterSchema> = keyof TFilterSchema
type SortOrder = 'asc' | 'desc'

export const DEFAULT_PAGE = 0
export const DEFAULT_LIMIT = 10

export type PaginationParams<TFilterSchema> = {
  limit: number
  page: number
  sort?: Record<SortKey<TFilterSchema>, SortOrder>
} & {
  [key in keyof TFilterSchema]?: TFilterSchema[key]
}

export class PaginationParamsBuilder<TFilter> {
  private options = {
    limit: DEFAULT_LIMIT,
    page: DEFAULT_PAGE,
    sort: undefined,
  } as PaginationParams<TFilter>

  constructor(paginationOptions?: PaginationOptions<TFilter>) {
    if (paginationOptions === undefined) {
      return
    }

    this.options = {
      limit: paginationOptions.pagination.perPage ?? DEFAULT_LIMIT,
      page: paginationOptions.pagination.page ?? DEFAULT_PAGE,
    } as PaginationParams<TFilter>
  }

  public build(): PaginationParams<TFilter> {
    return this.options
  }

  public buildEncoded(): string {
    return base64Encode(JSON.stringify(this.build()))
  }

  public withFilter<TKey extends keyof TFilter>(
    key: TKey,
    value: PaginationParams<TFilter>[TKey],
  ): PaginationParamsBuilder<TFilter> {
    if (value !== null && value !== '') {
      this.options[key] = value
    }

    return this
  }

  public withPage(page: number): PaginationParamsBuilder<TFilter> {
    this.options.page = page
    return this
  }

  public withPerPage(perPage: number): PaginationParamsBuilder<TFilter> {
    this.options.limit = perPage
    return this
  }

  public withSort(key: SortKey<TFilter>, order: SortOrder): PaginationParamsBuilder<TFilter> {
    this.options.sort = { [key]: order } as Record<keyof TFilter, SortOrder>
    return this
  }
}
