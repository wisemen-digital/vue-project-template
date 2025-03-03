import type { Permission } from '@/client'
import type { UserUuid } from '@/models/user/userUuid.model'
import type { SettingRoleUuid } from '@/modules/setting/models/setting-role/settingRoleUuid.model.ts'

export interface UserDetail {
  uuid: UserUuid
  email: string
  firstName: string | null
  lastName: string | null
  permissions: Permission[]
  roles: {
    uuid: SettingRoleUuid
    name: string
  }[]
}
