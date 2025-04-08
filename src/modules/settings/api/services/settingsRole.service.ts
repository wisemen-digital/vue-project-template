import { z } from 'zod'

import {
  createRoleV1,
  deleteRoleV1,
  updateRolesPermissionsV1,
  viewRoleIndexV1,
} from '@/client'
import type { SettingsRole } from '@/modules/settings/models/role/settingsRole.model.ts'
import {
  SettingsRolePermissionUpdateTransformer,
  SettingsRoleTransformer,
} from '@/modules/settings/models/role/settingsRole.transformer.ts'
import type { SettingsRolePermissionUpdateForm } from '@/modules/settings/models/role/settingsRolePermissionUpdateForm.model.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

export class SettingsRoleService {
  static async create(roleName: string): Promise<void> {
    await createRoleV1({ body: { name: roleName } })
  }

  static async delete(roleUuid: SettingsRoleUuid): Promise<void> {
    await deleteRoleV1({ path: { role: roleUuid } })
  }

  static async getAll(): Promise<SettingsRole[]> {
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

    return response.data.items.map(SettingsRoleTransformer.fromDto)
  }

  static async updateRolesInBulk(form: SettingsRolePermissionUpdateForm): Promise<void> {
    const body = SettingsRolePermissionUpdateTransformer.toDto(form)

    await updateRolesPermissionsV1({ body })
  }
}
