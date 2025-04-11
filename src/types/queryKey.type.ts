import type { PaginationOptions } from '@wisemen/vue-core-components'
import type { ComputedRef } from 'vue'

import type { ContactUuid } from '@/models/contact/contactUuid.model'
import type { ContactIndexPagination } from '@/models/contact/index/contactIndexPagination.model'
import type { UserIndexPagination } from '@/models/user/index/userIndexPagination.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model'
import type { SettingsEventLogIndexPagination } from '@/modules/settings/models/event-log/settingsEventLogIndexPagination.model.ts'

interface ProjectQueryKeys {
  globalSearchIndex: {
    search: ComputedRef<string>
  }
  contactDetail: {
    contactUuid: ComputedRef<ContactUuid>
  }
  contactIndex: {
    paginationOptions?: ComputedRef<PaginationOptions<ContactIndexPagination>>
  }
  permissions: void
  preferences: void
  roles: void
  settingsEventLogIndex: {
    paginationOptions: ComputedRef<PaginationOptions<SettingsEventLogIndexPagination>>
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
