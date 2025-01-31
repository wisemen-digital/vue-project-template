import type { Permission } from '@/client'
import type { SettingPermission } from '@/models/permission/permission.model.ts'
import type { SettingPermissionAction } from '@/models/permission/permissionAction.model'
import type { SettingPermissionId } from '@/models/permission/permissionId.model'

export class PermissionTransformer {
  static fromDto(permissionsDto: Permission[]): SettingPermission[] {
    const permissions: SettingPermission[] = []

    for (let i = 0; i < permissionsDto.length; i++) {
      const [
        id,
        action,
      ] = permissionsDto[i].split('.')

      const permissionId = id as SettingPermissionId
      const permissionAction = action as SettingPermissionAction

      if (permissions.some((permission) => permission.id === id)) {
        const index = permissions.findIndex((permission) => permission.id === id)

        if (action) {
          permissions[index].actions?.push(permissionAction)
        }
      }
      else {
        if (action) {
          permissions.push({
            id: permissionId,
            actions: [
              permissionAction,
            ],
          })
        }
        else {
          permissions.push({
            id: permissionId,
            actions: null,
          })
        }
      }
    }

    return permissions
  }
}
