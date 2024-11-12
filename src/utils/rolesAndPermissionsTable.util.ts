import type { Permission } from '@/models/permission/permission.model.ts'
import type { PermissionAction } from '@/models/permission/permissionAction.model.ts'
import type { Role } from '@/models/role/role.model.ts'

export class RolesAndPermissionsTableUtil {
  static createGrid(permissions: Permission[], roles: Role[]): Map<string, null | string[]> {
    const grid = new Map<string, null | string[]>()

    permissions.forEach((permission) => {
      roles.forEach((role) => {
        const value = role.permissions.find((rolePermission) => rolePermission.id === permission.id)

        grid.set(`${permission.id}-${role.uuid}`, value !== undefined ? value.actions : [])
      })
    })

    return grid
  }

  static mapGridToRoles(grid: Map<string, null | string[]>, permissions: Permission[], roles: Role[]): Role[] {
    const roleArray: Role[] = []

    permissions.forEach((permission) => {
      roles.forEach((roleIndex) => {
        const role = roleArray.find((role) => role.uuid === roleIndex.uuid)
        const value = grid.get(`${permission.id}-${roleIndex.uuid}`) as PermissionAction[]

        if (!value) {
          return
        }

        if (!role) {
          roleArray.push({
            ...roleIndex,
            permissions: [
              { id: permission.id, actions: (value) ?? [] },
            ],
          })
        }

        if (role) {
          role.permissions.push({ id: permission.id, actions: (value) ?? [] })
        }
      })
    })

    return roleArray
  }
}
