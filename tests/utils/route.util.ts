import type { Page } from '@playwright/test'

import type { PaginatedDtoData } from '@/models/paginated-data/paginatedData.model'

function getPaginatedJson<T>(response: T[]): PaginatedDtoData {
  return {
    items: response,
    meta: {
      total: response.length,
    },
  }
}

type RequestMethod = 'DELETE' | 'GET' | 'POST' | 'PUT'

export class RouteUtil {
  static async interceptData<T>(method: RequestMethod, page: Page, url: string, data: T): Promise<void> {
    await page.route(`*/**/api/v1/${url}`, async (route) => {
      await route.fulfill({
        contentType: 'application/json',
        headers: {
          method,
        },
        json: data,
        status: 200,
      })
    })
  }

  static async interceptPaginatedData<T>(page: Page, url: string, data: T[]): Promise<void> {
    await page.route(`*/**/api/v1/${url}`, async (route) => {
      await route.fulfill({
        json: getPaginatedJson(data),
      })
    })
  }
}
