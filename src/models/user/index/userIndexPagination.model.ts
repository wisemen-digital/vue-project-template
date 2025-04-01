import type { BasePagination } from '@wisemen/vue-core'

import type { Permission } from '@/client'

export type UserIndexPagination = BasePagination<{
  filter: {
    permissions: Permission[]
  }
  sort: undefined
}>
