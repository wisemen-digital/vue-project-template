import { z } from 'zod'

import {
  createRoleV1,
  deleteRoleV1,
  updateRolesPermissionsV1,
  viewRoleIndexV1,
} from '@/client'
import type { SettingRole } from '@/modules/setting/models/role/settingRole.model.ts'
import {
  SettingRolePermissionUpdateTransformer,
  SettingRoleTransformer,
} from '@/modules/setting/models/role/settingRole.transformer.ts'
import type { SettingRolePermissionUpdateForm } from '@/modules/setting/models/role/settingRolePermissionUpdateForm.model.ts'
import type { SettingRoleUuid } from '@/modules/setting/models/role/settingRoleUuid.model.ts'

export class SettingRoleService {
  static async create(roleName: string): Promise<void> {
    await createRoleV1({ body: { name: roleName } })
  }

  static async delete(roleUuid: SettingRoleUuid): Promise<void> {
    await deleteRoleV1({ path: { role: roleUuid } })
  }

  static async getAll(): Promise<SettingRole[]> {
    const response = await viewRoleIndexV1({
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
    const body = SettingRolePermissionUpdateTransformer.toDto(form)

    await updateRolesPermissionsV1({ body })
  }
}
