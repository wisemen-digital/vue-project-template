import { z } from 'zod'

export const permissionActionSchema = z.string().brand('PermissionAction')

export type SettingPermissionAction = z.infer<typeof permissionActionSchema>
