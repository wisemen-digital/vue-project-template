import { CalendarDate } from '@internationalized/date'
import { expect, test } from '@playwright/test'

import { TEST_ID } from '@/constants/testId.constant.ts'
import { UserDtoBuilder } from '@/models/user/detail/userDto.builder.ts'
import { UserIndexDtoBuilder } from '@/models/user/index/userIndexDto.builder.ts'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import { UuidUtil } from '@/utils/uuid.util.ts'
import { RouteUtil } from '@@/utils/route.util.ts'

test.describe.skip('User Update', () => {
  test('update an existing user', async ({ page }) => {
    const USER_UUID_1 = UuidUtil.getRandom<UserUuid>()

    const USER_INDEX_1 = new UserIndexDtoBuilder()
      .withUuid(USER_UUID_1)
      .withFirstName('John')
      .withLastName('Doe')
      .withBirthDate(new CalendarDate(2000, 1, 1))
      .build()

    const USER_1 = new UserDtoBuilder()
      .withUuid(USER_UUID_1)
      .build()

    await RouteUtil.interceptPaginatedData(page, 'users?limit=20&offset=0', [
      USER_INDEX_1,
    ])

    await RouteUtil.interceptData('GET', page, `users/${USER_UUID_1}`, USER_1)

    await RouteUtil.interceptData('POST', page, `users/${USER_UUID_1}`, USER_1)

    await page.goto('/users')

    await page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.UUID).click()

    await expect(page.getByTestId(TEST_ID.APP_PAGE.TITLE)).toHaveText('John Doe')

    await page.getByTestId(TEST_ID.USERS.DETAIL.EDIT_BUTTON).click()

    await page.getByTestId(TEST_ID.USERS.FORM.FIRST_NAME_INPUT).fill('James')
    await page.getByTestId(TEST_ID.USERS.FORM.LAST_NAME_INPUT).fill('Dyson')
    await page.getByTestId(TEST_ID.USERS.FORM.SUBMIT_BUTTON).click()

    await expect(page.getByTestId(TEST_ID.USERS.UPDATE.SUCCESS_TOAST)).toBeVisible()
  })
})
