import { PaginationOptions } from '@wisemen/vue-core'
import { ComputedRef, Ref } from 'vue'

import { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'
import { UserUuid } from '@/models/user/userUuid.model'

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
