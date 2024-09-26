import { z } from 'zod'

import { s3FileUuidSchema } from '@/models/s3-file/s3FileUuid.model.ts'

export const s3fileUploadDtoSchema = z.object({
  uuid: s3FileUuidSchema,
  uploadUrl: z.string().url(),
})

export type S3FileUploadDto = z.infer<typeof s3fileUploadDtoSchema>
