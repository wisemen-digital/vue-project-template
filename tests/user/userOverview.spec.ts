import { expect } from '@playwright/test'

import { TEST_ID } from '@/constants/testId.constant.ts'
import { UserIndexDtoBuilder } from '@/models/user/index/userIndexDto.builder.ts'
import { test } from '@@/base.fixture'
import { InterceptorUtil } from '@@/utils/interceptor.util.ts'

test.skip('User Overview', () => {
  test('display users in the table', async ({ page }) => {
    const USER_1 = new UserIndexDtoBuilder()
      .withFirstName('John')
      .withLastName('Doe')
      .build()

    const USER_2 = new UserIndexDtoBuilder()
      .withFirstName('Jane')
      .withLastName('Johnson')
      .build()

    await InterceptorUtil.getPaginated(page, 'users*', [
      USER_1,
      USER_2,
    ])

    await page.goto('/users')

    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.FULL_NAME)).toBeVisible()
    // await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.FULL_NAME).nth(0)).toContainText('John Doe')
    // await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.FULL_NAME).nth(1)).toContainText('Jane Johnson')
  })
})
