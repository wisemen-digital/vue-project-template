import type { BasePagination } from '@wisemen/vue-core'

import type { UsersFilterQuery } from '@/client'

export type UserIndexPaginationDto = BasePagination<{
  filter: UsersFilterQuery
  sort: undefined
}>
