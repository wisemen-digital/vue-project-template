import { z } from 'zod'

export const permissionDtoSchema = z.string()

export type PermissionDto = z.infer<typeof permissionDtoSchema>
