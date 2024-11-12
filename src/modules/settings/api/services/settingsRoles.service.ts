import { httpClient } from '@/libs/http.lib.ts'
import type { Role } from '@/models/role/role.model.ts'
import { RoleTransformer } from '@/models/role/role.transformer.ts'
import { roleDtoSchema } from '@/models/role/roleDto.model.ts'

export class SettingsRolesService {
  static async getAll(): Promise<Role[]> {
    const dto = await httpClient.get({
      responseSchema: roleDtoSchema.array(),
      url: '/roles',
    })

    return dto.map(RoleTransformer.fromDto)
  }
}
