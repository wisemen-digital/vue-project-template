import type { PaginationOptions } from '@wisemen/vue-core'
import type { ComputedRef } from 'vue'

import type { UserIndexPagination } from '@/models/user/index/userIndexPagination.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model'
import type { SettingLogIndexPagination } from '@/modules/setting/models/event-log/settingEventLogIndexPagination.model.ts'

interface ProjectQueryKeys {
  permissions: void
  preference: {
    userUuid: ComputedRef<string | null>
  }
  roles: void
  settingLogIndex: {
    paginationOptions: ComputedRef<PaginationOptions<SettingLogIndexPagination>>
  }
  userDetail: {
    userUuid: ComputedRef<UserUuid>
  }
  userIndex: {
    paginationOptions?: ComputedRef<PaginationOptions<UserIndexPagination>>
  }
}

declare module '@wisemen/vue-core-query' {
  interface QueryKeys extends ProjectQueryKeys {}
}
