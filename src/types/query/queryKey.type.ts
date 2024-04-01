import type { MaybeRefOrGetter } from 'vue'

import { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'
import { PaginationParams } from '@/utils/paginationBuilder.util'

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
  [QueryKey.USERS]: PaginationParams<UserIndexFilters>
}
