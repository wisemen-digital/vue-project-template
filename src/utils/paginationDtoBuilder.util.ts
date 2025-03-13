import type {
  PaginationOptions,
  PaginationSortOrder,
} from '@wisemen/vue-core'

const DEFAULT_OFFSET = 0
const DEFAULT_LIMIT = 20

enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

type PaginationParamsSet = {
  key?: unknown
  limit: number
} | {
  limit: number
  offset: number
}

interface PaginationParams<TFilterSchema, TSortKeys> {
  filter: TFilterSchema
  pagination: PaginationParamsSet
  search?: string
  sort: {
    key: TSortKeys
    order: SortDirection
  }[]
}

export interface PaginationOffsetParams<TFilterSchema, TSortKeys> extends PaginationParams<TFilterSchema, TSortKeys> {
  pagination: {
    limit: number
    offset: number
  }
}

export interface PaginationKeysetParams<TFilterSchema, TSortKeys> extends PaginationParams<TFilterSchema, TSortKeys> {
  pagination: {
    key?: never
    limit: number
  }
}

interface PaginationSort {
  direction: PaginationSortOrder
  key: string
}

export class PaginationParamsBuilder<TFilterSchema, TSortKeys = Record<string, string>> {
  private params: PaginationParams<TFilterSchema, TSortKeys>

  constructor(paginationOptions?: PaginationOptions<TFilterSchema>) {
    const allFilters = {
      ...paginationOptions?.filters ?? {},
      ...paginationOptions?.staticFilters ?? {},
    }

    const pagination = this.getPaginationSet(paginationOptions)

    this.params = {
      pagination,
      search: paginationOptions?.search,
    } as PaginationParams<TFilterSchema, TSortKeys>

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

  private getPaginationSet(paginationOptions?: PaginationOptions<TFilterSchema>): PaginationParamsSet {
    const limit = (paginationOptions?.pagination.limit ?? DEFAULT_LIMIT)

    if (paginationOptions === undefined) {
      return {
        limit,
        offset: DEFAULT_OFFSET * limit,
      }
    }

    return paginationOptions?.pagination?.type === 'offset'
      ? {
          limit,
          offset: (paginationOptions?.pagination.offset ?? DEFAULT_OFFSET) * limit,
        }
      : {
          key: paginationOptions?.pagination.key,
          limit,
        }
  }

  public build<TFilterSchemaDto, TSortKeys>(
    transformer?: (filters: TFilterSchema) => TFilterSchemaDto,
  ): PaginationOffsetParams<TFilterSchemaDto, TSortKeys> {
    const pagination = this.params.pagination

    return {
      ...this.params,
      filter: transformer?.(this.params.filter as TFilterSchema) as TFilterSchemaDto,
      pagination: {
        limit: pagination.limit,
        offset: 'offset' in pagination ? pagination.offset : DEFAULT_OFFSET,
      },
      sort: this.params?.sort?.map((sort) => ({
        key: sort.key as unknown as TSortKeys,
        order: sort.order,
      })) ?? [],
    }
  }

  public buildKeyset<TFilterSchemaDto, TSortKeys>(
    transformer?: (filters: TFilterSchema) => TFilterSchemaDto,
  ): PaginationKeysetParams<TFilterSchemaDto, TSortKeys> {
    return {
      ...this.params,
      filter: transformer?.(this.params.filter as TFilterSchema) as TFilterSchemaDto,
      pagination: {
        key: (this.params.pagination as any).key,
        limit: this.params.pagination?.limit,
      },
      sort: this.params?.sort?.map((sort) => ({
        key: sort.key as unknown as TSortKeys,
        order: sort.order,
      })) ?? [],
    }
  }

  public withFilter<TKey extends keyof TFilterSchema>(
    key: TKey,
    value: TFilterSchema[TKey] | null | undefined,
  ): PaginationParamsBuilder<TFilterSchema, TSortKeys> {
    if (value !== null && value !== '') {
      this.params.filter = {
        ...this.params.filter,
        [key]: value,
      } as TFilterSchema
    }

    return this
  }

  public withKey(key: unknown | null): PaginationParamsBuilder<TFilterSchema, TSortKeys> {
    if ('offset' in this.params.pagination) {
      throw new Error('Cannot set key when using offset pagination')
    }

    this.params.pagination.key = key

    return this
  }

  public withLimit(limit: number): PaginationParamsBuilder<TFilterSchema, TSortKeys> {
    this.params.pagination.limit = limit

    return this
  }

  public withOffset(offset: number): PaginationParamsBuilder<TFilterSchema, TSortKeys> {
    if ('key' in this.params.pagination) {
      throw new Error('Cannot set offset when using keyset pagination')
    }

    if ('offset' in this.params.pagination) {
      this.params.pagination.offset = offset
    }

    return this
  }

  public withSearch(search: string): PaginationParamsBuilder<TFilterSchema, TSortKeys> {
    this.params.search = search

    return this
  }

  public withSort(sort: PaginationSort): PaginationParamsBuilder<TFilterSchema, TSortKeys> {
    this.params.sort = [
      {
        key: sort.key as TSortKeys,
        order: sort.direction as unknown as SortDirection,
      },
    ]

    return this
  }
}
