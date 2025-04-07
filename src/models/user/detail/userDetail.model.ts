import type { Permission } from '@/client'
import type { UserUuid } from '@/models/user/userUuid.model'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

export interface UserDetail {
  uuid: UserUuid
  email: string
  firstName: string | null
  lastName: string | null
  permissions: Permission[]
  roles: {
    uuid: SettingsRoleUuid
    name: string
  }[]
}
