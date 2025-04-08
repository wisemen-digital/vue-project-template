import type { PaginatedDtoData } from '@/types/paginatedData.type.ts'

export class PaginationUtil {
  static getJson<T>(response: T[]): PaginatedDtoData {
    return {
      items: response,
      meta: {
        limit: response.length,
        offset: 0,
        total: response.length,
      },
    }
  }
}
