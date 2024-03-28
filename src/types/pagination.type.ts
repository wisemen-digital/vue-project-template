import type { ComputedRef } from 'vue'

export type PaginationApiParams = Record<string, ComputedRef<unknown> | unknown> & {
  limit: ComputedRef<number>
  page: ComputedRef<number>
}

export interface PaginatedData<TSchema> {
  data: TSchema[]
  total: number
}
