import type { Permission } from '@/models/permission/permission.model.ts'
import type { PermissionAction } from '@/models/permission/permissionAction.model'
import type { PermissionDto } from '@/models/permission/permissionDto.model.ts'
import type { PermissionId } from '@/models/permission/permissionId.model'

export class PermissionTransformer {
  static fromDto(permissionsDto: PermissionDto[]): Permission[] {
    const permissions: Permission[] = []

    for (let i = 0; i < permissionsDto.length; i++) {
      const [
        id,
        action,
      ] = permissionsDto[i].split('.')

      const permissionId = id as PermissionId
      const permissionAction = action as PermissionAction

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
