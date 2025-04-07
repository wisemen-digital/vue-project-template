import type { GlobalSearchCollectionName } from '@/client'
import type { UserUuid } from '@/models/user/userUuid.model.ts'

interface BaseGlobalSearchEntity {
  type: GlobalSearchCollectionName
  meta: string | null
}

interface GlobalSearchUser extends BaseGlobalSearchEntity {
  uuid: UserUuid
  name: string
  type: GlobalSearchCollectionName.USER
}

export interface GlobalSearchIndex {
  entity: GlobalSearchUser
  textMatch: number
}
