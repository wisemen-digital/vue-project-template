import { z } from 'zod'

export const settingsRoleUuidSchema = z.string().brand('SettingsRoleUuid')

export type SettingsRoleUuid = z.infer<typeof settingsRoleUuidSchema>
