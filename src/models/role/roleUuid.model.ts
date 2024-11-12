import { z } from 'zod'

// eslint-disable-next-line unused-imports/no-unused-vars
const roleUuidSchema = z.string().brand('RoleUuid')

export type RoleUuid = z.infer<typeof roleUuidSchema>
