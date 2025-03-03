import { z } from 'zod'

import { permissionSchema } from '@/models/permission/permission.model.ts'
import { settingRoleUuidSchema } from '@/modules/settings/models/setting-role/settingRoleUuid.model.ts'

export const settingRolePermissionUpdateFormSchema = z.object({
  roles: z.object({
    isEditable: z.boolean(),
    permissions: z.object({
      actions: permissionSchema.array(),
      key: z.string(),
    }).array(),
    roleUuid: settingRoleUuidSchema,
  }).array(),
})

export type SettingRolePermissionUpdateForm = z.infer<typeof settingRolePermissionUpdateFormSchema>
