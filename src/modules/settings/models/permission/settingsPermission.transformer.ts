import type { Permission } from '@/client'
import type { SettingPermission } from '@/modules/settings/models/permission/settingsPermission.model.ts'

export class SettingsPermissionTransformer {
  static fromDto(dto: Permission[]): SettingPermission[] {
    const result: SettingPermission[] = []

    for (const permission of dto) {
      const key = permission.split('.')[0]

      if (result.some((item) => item.key === key)) {
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
    }

    return result
  }
}
