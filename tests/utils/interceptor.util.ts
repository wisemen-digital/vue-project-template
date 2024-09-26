import type { Page } from '@playwright/test'

import type { PaginatedDtoData } from '@/models/paginated-data/paginatedData.model'
import type { S3FileUploadDto } from '@/models/s3-file/s3FileCreate.model.ts'
import type { S3FileDto } from '@/models/s3-file/s3FileDto.model.ts'

function getPaginatedJson<T>(response: T[]): PaginatedDtoData {
  return {
    items: response,
    meta: {
      total: response.length,
    },
  }
}

type RequestMethod = 'DELETE' | 'GET' | 'POST' | 'PUT'

export class InterceptorUtil {
  static async delete<T>(page: Page, url: string, data: T): Promise<void> {
    await this.interceptData('DELETE', page, url, data)
  }

  static async fileUpload(page: Page, file: S3FileDto): Promise<void> {
    const fileUpload: S3FileUploadDto = {
      uuid: file.uuid,
      uploadUrl: `http://mock.s3.dienstenthuis/${file.uuid}`,
    }

    await this.post(page, `files`, fileUpload)

    await page.route(fileUpload.uploadUrl, async (route) => {
      await route.fulfill({
        contentType: 'application/json',
        headers: {
          method: 'PUT',
        },
        json: file,
      })
    })

    await this.post(page, `files/${file.uuid}/confirm-upload`, file.uuid)
  }

  static async get<T>(page: Page, url: string, data: T): Promise<void> {
    await this.interceptData('GET', page, url, data)
  }

  static async getPaginated<T>(page: Page, url: string, data: T[]): Promise<void> {
    await page.route(`*/**/api/v1/${url}`, async (route) => {
      await route.fulfill({
        json: getPaginatedJson(data),
      })
    })
  }

  static async post<T>(page: Page, url: string, data: T): Promise<void> {
    await this.interceptData('POST', page, url, data)
  }

  private static async interceptData<T>(method: RequestMethod, page: Page, url: string, data: T): Promise<void> {
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
}
