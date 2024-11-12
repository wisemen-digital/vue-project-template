import { httpClient } from '@/libs/http.lib.ts'
import type { Permission } from '@/models/permission/permission.model.ts'
import { PermissionTransformer } from '@/models/permission/permission.transformer.ts'
import { permissionDtoSchema } from '@/models/permission/permissionDto.model.ts'

export class SettingsPermissionsService {
  static async getAll(): Promise<Permission[]> {
    const dto = await httpClient.get({
      responseSchema: permissionDtoSchema.array(),
      url: '/permissions',
    })

    return PermissionTransformer.fromDto(dto)
  }
}
