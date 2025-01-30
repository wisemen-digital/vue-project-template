import type { SettingPermission } from '@/models/permission/permission.model.ts'
import type { RoleName } from '@/models/setting-role/role.enum.ts'
import type { RoleUuid } from '@/models/setting-role/roleUuid.model.ts'

export interface SettingRole {
  uuid: RoleUuid
  name: RoleName
  permissions: SettingPermission[]
}
