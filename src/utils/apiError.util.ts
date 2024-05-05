import axios from 'axios'
import { z } from 'zod'

const apiErrorSchema = z.object({
  code: z.string(),
  description: z.string(),
  meta: z.record(z.unknown()),
  source: z.object({
    parameter: z.string(),
    pointer: z.string(),
  }).optional(),
  status: z.number(),
  title: z.string(),
})

export type ApiError = z.infer<typeof apiErrorSchema>

export function parseApiError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) {
    throw error
  }

  const { response } = error

  if (response === undefined) {
    throw error
  }

  const { data } = response

  if (data === undefined) {
    throw error
  }

  return apiErrorSchema.parse(data)
}
