import type { Permission } from '@/client'
import type { SettingPermission } from '@/models/permission/permission.model.ts'

export class PermissionTransformer {
  static fromDto(dto: Permission[]): SettingPermission[] {
    const result: SettingPermission[] = []

    dto.forEach((permission) => {
      const key = permission.split('.')[0]

      if (result.find((item) => item.key === key)) {
        const index = result.findIndex((item) => item.key === key)

        result[index].actions.push(permission)
      }
      else {
        result.push({
          actions: [
            permission,
          ],
          key,
        })
      }
    })

    return result
  }
}
