import { z } from 'zod'

import { httpClient } from '@/libs/http.lib.ts'
import type { Role } from '@/models/role/role.model.ts'
import { RoleTransformer } from '@/models/role/role.transformer.ts'
import { roleDtoSchema } from '@/models/role/roleDto.model.ts'
import type { RoleUuid } from '@/models/role/roleUuid.model.ts'

export class SettingsRolesService {
  static async create(roleName: string): Promise<void> {
    await httpClient.post({
      body: {
        name: roleName,
      },
      responseSchema: z.unknown(),
      url: '/roles',
    })
  }

  static async delete(roleUuid: RoleUuid): Promise<void> {
    await httpClient.delete({
      responseSchema: z.unknown(),
      url: `/roles/${roleUuid}`,
    })
  }

  static async getAll(): Promise<Role[]> {
    const dto = await httpClient.get({
      responseSchema: roleDtoSchema.array(),
      url: '/roles',
    })

    return dto.map(RoleTransformer.fromDto)
  }

  static async updateRolesBulk(roles: Role[]): Promise<void> {
    await httpClient.post({
      body: {
        roles: roles.map((role) => ({
          uuid: role.uuid,
          permissions: role.permissions,
        })),
      },
      responseSchema: z.unknown(),
      url: '/roles/bulk',
    })
  }
}
