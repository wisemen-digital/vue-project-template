import { z } from 'zod'

import { settingPermissionSchema } from '@/modules/setting/models/permission/settingPermission.model.ts'
import { settingRoleUuidSchema } from '@/modules/setting/models/role/settingRoleUuid.model.ts'

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
