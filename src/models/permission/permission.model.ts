import type { SettingPermissionAction } from '@/models/permission/permissionAction.model.ts'
import type { SettingPermissionId } from '@/models/permission/permissionId.model.ts'

export interface SettingPermission {
  id: SettingPermissionId
  actions: SettingPermissionAction[] | null
}
