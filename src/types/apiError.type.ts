export interface ApiError {
  errors: {
    code: ApiErrorCode
    detail: string
    source?: {
      pointer: string
    }
    status?: string
  }[]
}
