import type { BasePagination } from '@wisemen/vue-core'

import type { UsersFilterQuery } from '@/client'

export interface UserIndexPaginationDto extends BasePagination {
  filter: UsersFilterQuery
}
