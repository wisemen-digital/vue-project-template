import { z } from 'zod'

export const permissionActionSchema = z.string().brand('PermissionAction')

export type PermissionAction = z.infer<typeof permissionActionSchema>
