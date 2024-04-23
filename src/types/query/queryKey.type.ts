import { PaginationOptions } from '@wisemen/vue-core'
import type { ComputedRef, Ref } from 'vue'

import { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'
import { UserUuid } from '@/models/user/userUuid.model'

export enum QueryKey {
  CURRENT_USER = 'currentUser',

  USER_DETAIL = 'user-detail',
  USERS = 'users',
}

export interface QueryKeys {
  [QueryKey.CURRENT_USER]: void

  [QueryKey.USER_DETAIL]: {
    userUuid: Ref<UserUuid>
  }
  [QueryKey.USERS]: {
    paginationOptions: ComputedRef<PaginationOptions<UserIndexFilters>>
  }
}
