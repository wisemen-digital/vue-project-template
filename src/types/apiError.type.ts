import type { ApiErrorCode } from '@/models/api-error/apiError.model.ts'

export interface ApiError {
  errors: {
    code: ApiErrorCode
    detail: string
    source?: {
      pointer: string
    }
    status: string
  }[]
}
