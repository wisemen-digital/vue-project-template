import type { SettingPermission } from '@/models/permission/permission.model.ts'
import type { RoleUuid } from '@/models/setting-role/roleUuid.model.ts'

export interface SettingRole {
  uuid: RoleUuid
  name: string
  permissions: SettingPermission[]
}
