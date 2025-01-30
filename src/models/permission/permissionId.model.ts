import { z } from 'zod'

export const permissionIdSchema = z.string().brand('PermissionId')

export type SettingPermissionId = z.infer<typeof permissionIdSchema>
