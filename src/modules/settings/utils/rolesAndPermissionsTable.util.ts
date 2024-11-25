import type { Permission } from '@/models/permission/permission.model.ts'
import type { PermissionAction } from '@/models/permission/permissionAction.model.ts'
import type { Role } from '@/models/role/role.model.ts'

export class RolesAndPermissionsTableUtil {
  static createGrid(permissions: Permission[], roles: Role[]): Map<string, string[] | null> {
    const grid = new Map<string, string[] | null>()

    permissions.forEach((permission) => {
      roles.forEach((role) => {
        const rolePermission = role.permissions.find((rolePermission) => rolePermission.id === permission.id) ?? null

        if (rolePermission === null) {
          grid.set(`${permission.id}-${role.uuid}`, null)

          return
        }

        if (rolePermission.actions === null) {
          grid.set(`${permission.id}-${role.uuid}`, [])

          return
        }

        grid.set(`${permission.id}-${role.uuid}`, rolePermission.actions)
      })
    })

    return grid
  }

  static mapGridToRoles(grid: Map<string, string[] | null>, permissions: Permission[], roles: Role[]): Role[] {
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
