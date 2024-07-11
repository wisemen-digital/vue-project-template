import { expect, test } from '@playwright/test'

import { TEST_ID } from '@/constants/testId.constant.ts'
import { UserIndexDtoBuilder } from '@/models/user/index/userIndexDto.builder.js'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import { UuidUtil } from '@/utils/uuid.util.ts'
import { RouteUtil } from '@@/utils/route.util.js'

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

    await expect(page.getByTestId(TEST_ID.APP_PAGE.TITLE)).toContainText('Users')
  })
})
