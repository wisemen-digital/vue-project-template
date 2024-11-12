import { z } from 'zod'

export const permissionIdSchema = z.string().brand('PermissionId')
export type PermissionId = z.infer<typeof permissionIdSchema>
