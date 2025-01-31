import type { RoleUuid } from '@/models/setting-role/roleUuid.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model'

export interface UserDetail {
  uuid: UserUuid
  email: string
  firstName: string | null
  fullName: string | null
  lastName: string | null
  roles: {
    uuid: RoleUuid
    name: string
  }[]
}
