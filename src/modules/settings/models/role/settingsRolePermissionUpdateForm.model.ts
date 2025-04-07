import { z } from 'zod'

import { settingsPermissionSchema } from '@/modules/settings/models/permission/settingsPermission.model.ts'
import { settingsRoleUuidSchema } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

export const settingsRolePermissionUpdateFormSchema = z.object({
  roles: z.object({
    roleUuid: settingsRoleUuidSchema,
    isEditable: z.boolean(),
    permissions: z.object({
      actions: settingsPermissionSchema.array(),
      key: z.string(),
    }).array(),
  }).array(),
})

export type SettingsRolePermissionUpdateForm = z.infer<typeof settingsRolePermissionUpdateFormSchema>
