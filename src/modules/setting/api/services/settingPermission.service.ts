import type { Permission } from '@/client'
import { permissionV1 } from '@/client'
import type { SettingPermission } from '@/modules/setting/models/permission/settingPermission.model.ts'
import { SettingPermissionTransformer } from '@/modules/setting/models/permission/settingPermission.transformer.ts'

export class SettingPermissionService {
  static async getAll(): Promise<SettingPermission[]> {
    const response = await permissionV1()

    return SettingPermissionTransformer.fromDto(response.data as Permission[])
  }
}
