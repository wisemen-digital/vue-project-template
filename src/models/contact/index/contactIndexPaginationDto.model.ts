import type { BasePagination } from '@wisemen/vue-core'

export type ContactIndexPaginationDto = BasePagination<{
  filter: {
    isActive?: string
  }
  sort: undefined
}>
