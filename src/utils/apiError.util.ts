import type { ApiError } from '@/types/apiError.type.ts'

export class ApiErrorUtil {
  static isError(error: unknown): error is ApiError {
    return (error as ApiError)?.errors !== undefined
  }
}
