import type { ComputedRef } from 'vue'

export type PaginationApiParams = {
  limit: ComputedRef<number>
  page: ComputedRef<number>
} & Record<string, ComputedRef<unknown> | unknown>

export interface PaginatedData<TSchema> {
  data: TSchema[]
  total: number
}
