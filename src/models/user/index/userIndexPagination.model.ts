import type { BasePagination } from '@wisemen/vue-core'

import type { Permission } from '@/client'

export interface UserIndexPagination extends BasePagination {
  filter: {
    permissions: Permission[]
  }
}
