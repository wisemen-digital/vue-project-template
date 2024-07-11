import type { Page } from '@playwright/test'

import type { PaginatedDtoData } from '@/models/paginated-data/paginatedData.model.js'

function getPaginatedJson<T>(response: T[]): PaginatedDtoData {
  return {
    items: response,
    meta: {
      total: 1,
    },
  }
}

export class RouteUtil {
  static async interceptData<T>(page: Page, url: string, data: T): Promise<void> {
    await page.route(url, async (route) => {
      await route.fulfill({
        json: data,
      })
    })
  }

  static async interceptPaginatedData<T>(page: Page, url: string, data: T[]): Promise<void> {
    await page.route(url, async (route) => {
      await route.fulfill({
        json: getPaginatedJson(data),
      })
    })
  }
}
