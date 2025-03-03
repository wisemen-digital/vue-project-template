import { z } from 'zod'

import {
  createRoleControllerCreateRoleV1,
  deleteRoleControllerDeleteRoleV1,
  updateRolesPermissionsControllerUpdateRolePermissionsV1,
  viewRolesControllerGetRolesV1,
} from '@/client'
import type { SettingRole } from '@/modules/settings/models/setting-role/settingRole.model.ts'
import {
  SettingRolePermissionUpdateTransformer,
  SettingRoleTransformer,
} from '@/modules/settings/models/setting-role/settingRole.transformer.ts'
import type { SettingRolePermissionUpdateForm } from '@/modules/settings/models/setting-role/settingRolePermissionUpdateForm.model.ts'
import type { SettingRoleUuid } from '@/modules/settings/models/setting-role/settingRoleUuid.model.ts'

export class SettingRoleService {
  static async create(roleName: string): Promise<void> {
    await createRoleControllerCreateRoleV1({
      body: {
        name: roleName,
      },
    })
  }

  static async delete(roleUuid: SettingRoleUuid): Promise<void> {
    await deleteRoleControllerDeleteRoleV1({
      path: {
        role: roleUuid,
      },
    })
  }

  static async getAll(): Promise<SettingRole[]> {
    const response = await viewRolesControllerGetRolesV1({
      responseValidator: async (data) => {
        return await z.object({
          items: z.object({
            uuid: z.string().uuid(),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
            name: z.string(),
            permissions: z.string().array(),
          }).array(),
        }).parseAsync(data)
      },
    })

    return response.data.items.map(SettingRoleTransformer.fromDto)
  }

  static async updateRolesInBulk(form: SettingRolePermissionUpdateForm): Promise<void> {
    await updateRolesPermissionsControllerUpdateRolePermissionsV1({
      body: SettingRolePermissionUpdateTransformer.toDto(form),
    })
  }
}
