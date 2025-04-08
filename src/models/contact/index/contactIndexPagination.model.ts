import type { BasePagination } from '@wisemen/vue-core'

export type ContactIndexPagination = BasePagination<{
  filter: {
    isActive?: boolean
  }
  sort: undefined
}>
