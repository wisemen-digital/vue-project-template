import type { SettingPermission } from '@/models/permission/permission.model.ts'
import type { SettingRole } from '@/models/setting-role/role.model.ts'

export type RoleAndPermissionTableMapValue = string[] | null
export type RoleAndPermissionTableMapId = string

export class RoleAndPermissionTableUtil {
  static createGrid(
    permissions: SettingPermission[],
    roles: SettingRole[],
  ): Map<RoleAndPermissionTableMapId, RoleAndPermissionTableMapValue> {
    const grid = new Map<RoleAndPermissionTableMapId, RoleAndPermissionTableMapValue>()

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

  static isTableStateEqual(currentState: Map<any, any>, previousState: Map<any, any>): boolean {
    if (currentState.size !== previousState.size) {
      return false
    }
    for (const [
      key,
      val,
    ] of currentState) {
      const state = previousState.get(key)

      if (state !== val || (state === undefined && !previousState.has(key))) {
        return false
      }
    }

    return true
  }
}
