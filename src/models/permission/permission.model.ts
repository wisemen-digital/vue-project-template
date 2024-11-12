import type { PermissionAction } from '@/models/permission/permissionAction.model.ts'
import type { PermissionId } from '@/models/permission/permissionId.model.ts'

export interface Permission {
  id: PermissionId
  actions: PermissionAction[] | null
}
