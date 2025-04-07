import { z } from 'zod'

export const settingRoleUuidSchema = z.string().brand('SettingRoleUuid')
export type SettingRoleUuid = z.infer<typeof settingRoleUuidSchema>
