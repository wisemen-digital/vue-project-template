export interface ApiError {
  errors: {
    code: string
    detail: string
    source?: {
      pointer: string
    }
    status?: string
  }[]
}
