import type { Permission } from '@/client'
import type { SettingRoleUuid } from '@/modules/setting/models/role/settingRoleUuid.model.ts'

export interface SettingRole {
  uuid: SettingRoleUuid
  isDefault: boolean
  isSystemAdmin: boolean
  name: string
  permissions: Permission[]
}
