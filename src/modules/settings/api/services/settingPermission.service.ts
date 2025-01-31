import type { Permission } from '@/client'
import { permissionControllerGetPermissionsV1 } from '@/client'
import type { SettingPermission } from '@/models/permission/permission.model.ts'
import { PermissionTransformer } from '@/models/permission/permission.transformer.ts'

export class SettingPermissionService {
  static async getAll(): Promise<SettingPermission[]> {
    const response = await permissionControllerGetPermissionsV1()

    return PermissionTransformer.fromDto(response.data as Permission[])
  }
}
