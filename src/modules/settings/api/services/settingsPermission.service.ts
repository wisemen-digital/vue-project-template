import type { Permission } from '@/client'
import { permissionV1 } from '@/client'
import type { SettingsPermission } from '@/modules/settings/models/permission/settingsPermission.model.ts'
import { SettingsPermissionTransformer } from '@/modules/settings/models/permission/settingsPermission.transformer.ts'

export class SettingsPermissionService {
  static async getAll(): Promise<SettingsPermission[]> {
    const response = await permissionV1()

    return SettingsPermissionTransformer.fromDto(response.data as Permission[])
  }
}
