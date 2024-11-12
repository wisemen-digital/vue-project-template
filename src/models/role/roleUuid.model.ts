import { z } from 'zod'

export const roleUuidSchema = z.string().brand('RoleUuid')

export type RoleUuid = z.infer<typeof roleUuidSchema>
