import { CalendarDate } from '@internationalized/date'
import { expect, test } from '@playwright/test'

import { TEST_ID } from '@/constants/testId.constant.ts'
import { UserIndexDtoBuilder } from '@/models/user/index/userIndexDto.builder.js'
import { RouteUtil } from '@@/utils/route.util.ts'

test.describe.skip('User Overview', () => {
  test('display users in the table', async ({ page }) => {
    const USER_1 = new UserIndexDtoBuilder()
      .withFirstName('John')
      .withLastName('Doe')
      .withBirthDate(new CalendarDate(2000, 1, 1))
      .build()

    const USER_2 = new UserIndexDtoBuilder()
      .withFirstName('Jane')
      .withLastName('Johnson')
      .withBirthDate(new CalendarDate(2010, 1, 1))
      .build()

    await RouteUtil.interceptPaginatedData(page, 'users*', [
      USER_1,
      USER_2,
    ])

    await page.goto('/users')

    // eslint-disable-next-line no-console
    console.log('content', await page.content())

    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.UUID).nth(0)).toContainText(USER_1.uuid)
    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.FULL_NAME).nth(0)).toContainText('John Doe')
    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.BIRTH_DATE).nth(0)).toContainText('01/01/2000')

    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.UUID).nth(1)).toContainText(USER_2.uuid)
    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.FULL_NAME).nth(1)).toContainText('Jane Johnson')
    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.BIRTH_DATE).nth(1)).toContainText('01/01/2010')
  })
})
