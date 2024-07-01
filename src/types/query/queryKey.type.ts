import type { PaginationOptions } from '@wisemen/vue-core'
import type { ComputedRef, Ref } from 'vue'

import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'
import type { UserUuid } from '@/models/user/userUuid.model'

interface ProjectQueryKeys {
  userDetail: {
    userUuid: Ref<UserUuid>
  }
  userIndex: {
    paginationOptions?: ComputedRef<PaginationOptions<UserIndexFilters>>
  }
}

declare module '@wisemen/vue-core' {
  interface QueryKeys extends ProjectQueryKeys {}
}
