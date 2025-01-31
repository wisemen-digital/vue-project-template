import type { SettingPermission } from '@/models/permission/permission.model.ts'
import type { SettingRole } from '@/models/setting-role/role.model.ts'
import type {
  RoleAndPermissionTableMapId,
  RoleAndPermissionTableMapValue,
} from '@/modules/settings/utils/roleAndPermissionTable.util.ts'

export interface SettingRoleBulkUpdateForm {
  permissions: SettingPermission[]
  roleMap: Map<RoleAndPermissionTableMapId, RoleAndPermissionTableMapValue>
  roles: SettingRole[]
}
