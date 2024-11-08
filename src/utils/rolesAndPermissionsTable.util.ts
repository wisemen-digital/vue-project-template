import type { CalendarDateTime } from '@/models/date/calendarDateTime.model.ts'

interface PermissionIndex {
  id: string
  actions: string[]
}

interface Role {
  uuid: string
  createdAt: CalendarDateTime
  updatedAt: CalendarDateTime
  name: string
  permissions: {
    id: string
    actions: string[]
  }[]
}

export class RolesAndPermissionsTableUtil {
  static createGrid(permissions: PermissionIndex[], roles: Role[]): Map<string, null | string[]> {
    const grid = new Map<string, null | string[]>()

    permissions.forEach((permission) => {
      roles.forEach((_role, index) => {
        const value = roles[index].permissions.find((rolePermission) => rolePermission.id === permission.id)

        grid.set(`${permission.id}-${index}`, value !== undefined ? value.actions : null)
      })
    })

    return grid
  }

  static mapGridToRoles(grid: Map<string, null | string[]>, permissions: PermissionIndex[], roles: Role[]): Role[] {
    const roleArray: Role[] = []

    permissions.forEach((permission) => {
      roles.forEach((roleIndex, index) => {
        const role = roleArray.find((role) => role.uuid === roleIndex.uuid)
        const value = grid.get(`${permission.id}-${index}`)

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
