import { z } from 'zod'

import { settingPermissionSchema } from '@/modules/settings/models/permission/settingsPermission.model.ts'
import { settingRoleUuidSchema } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

export const settingRolePermissionUpdateFormSchema = z.object({
  roles: z.object({
    roleUuid: settingRoleUuidSchema,
    isEditable: z.boolean(),
    permissions: z.object({
      actions: settingPermissionSchema.array(),
      key: z.string(),
    }).array(),
  }).array(),
})

export type SettingRolePermissionUpdateForm = z.infer<typeof settingRolePermissionUpdateFormSchema>
