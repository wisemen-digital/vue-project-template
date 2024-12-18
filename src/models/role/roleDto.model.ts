import { z } from 'zod'

import { calendarDateTimeDtoSchema } from '@/models/date/calendarDateTimeDto.model.ts'
import { permissionDtoSchema } from '@/models/permission/permissionDto.model.ts'
import { roleUuidSchema } from '@/models/role/roleUuid.model.ts'

export const roleDtoSchema = z.object({
  uuid: roleUuidSchema,
  createdAt: calendarDateTimeDtoSchema,
  updatedAt: calendarDateTimeDtoSchema,
  name: z.string(),
  permissions: permissionDtoSchema.array(),
})

export type RoleDto = z.infer<typeof roleDtoSchema>
