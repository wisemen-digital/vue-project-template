import { PaginationOptions } from '@wisemen/vue-core'
import type {
  ComputedRef,
  Ref,
  UnwrapRef,
} from 'vue'

import { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'
import { UserUuid } from '@/models/user/userUuid.model'

//////////////////////////
interface QueryKeyWithParams<K extends keyof QueryKeys, TResData> {
  exact: true
  key: K
  params: {
    [P in keyof QueryKeys[K]]: ((params: TResData) => UnwrapRef<QueryKeys[K][P]>) | UnwrapRef<QueryKeys[K][P]>
  }
}

interface QueryKeyExactType<K extends keyof QueryKeys> {
  exact: false
  key: K
}

type QueryKeyTypes<K extends QueryKey, TResData> = QueryKeyExactType<K> | QueryKeyWithParams<K, TResData>

export type QueryKeyToInvalidate<K extends keyof QueryKeys, TResData> = QueryKeys[K] extends void
  ? {
      key: K
    }
  : QueryKeyTypes<K, TResData>

export type QueryKeysToInvalidate<TResData> = {
  [K in keyof QueryKeys]: QueryKeyToInvalidate<K, TResData>
}[keyof QueryKeys][]
//////////////////////////

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
