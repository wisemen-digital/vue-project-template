import { PaginationOptions } from '@wisemen/vue-core'
import type { MaybeRefOrGetter } from 'vue'

import { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'

export enum QueryKey {
  CURRENT_USER = 'currentUser',

  // Users
  USER_DETAIL = 'user-detail',
  USERS = 'users',
}

export interface QueryKeys {
  [QueryKey.CURRENT_USER]: void

  // Users
  [QueryKey.USER_DETAIL]: {
    userUuid: MaybeRefOrGetter<string>
  }
  [QueryKey.USERS]: PaginationOptions<UserIndexFilters>
}
