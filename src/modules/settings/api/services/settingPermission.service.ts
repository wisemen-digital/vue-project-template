import { httpClient } from '@/libs/http.lib.ts'
import type { SettingPermission } from '@/models/permission/permission.model.ts'
import { PermissionTransformer } from '@/models/permission/permission.transformer.ts'
import { permissionDtoSchema } from '@/models/permission/permissionDto.model.ts'

export class SettingPermissionService {
  static async getAll(): Promise<SettingPermission[]> {
    const dto = await httpClient.get({
      responseSchema: permissionDtoSchema.array(),
      url: '/permissions',
    })

    return PermissionTransformer.fromDto(dto)
  }
}
