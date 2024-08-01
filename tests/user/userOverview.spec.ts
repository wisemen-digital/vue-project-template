import { test } from '@playwright/test'

import { UserIndexDtoBuilder } from '@/models/user/index/userIndexDto.builder.js'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import { UuidUtil } from '@/utils/uuid.util.ts'
import { RouteUtil } from '@@/utils/route.util.ts'

test.describe('User Overview', () => {
  test('display users in the table', async ({ page }) => {
    const UUID_1 = UuidUtil.getRandom<UserUuid>()

    const USER_1 = new UserIndexDtoBuilder()
      .withUuid(UUID_1)
      .build()

    await RouteUtil.interceptPaginatedData(page, '*/**/api/v1/users*', [
      USER_1,
    ])

    await page.goto('/users')
  })
})
