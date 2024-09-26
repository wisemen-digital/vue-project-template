import { expect, test } from '@playwright/test'

import { TEST_ID } from '@/constants/testId.constant.ts'
import { UserDtoBuilder } from '@/models/user/detail/userDto.builder.ts'
import { InterceptorUtil } from '@@/utils/interceptor.util.ts'

test.describe('User Create', () => {
  test('create a new user', async ({ page }) => {
    await InterceptorUtil.getPaginated(page, 'users*', [])

    const USER_1 = new UserDtoBuilder().build()

    await InterceptorUtil.post(page, 'users', USER_1)

    await page.goto('/users')

    await page.getByTestId(TEST_ID.USERS.OVERVIEW.CREATE_BUTTON).click()

    await expect(page.getByTestId(TEST_ID.APP_PAGE.TITLE)).toHaveText('New user')

    await page.getByTestId(TEST_ID.USERS.FORM.FIRST_NAME_INPUT).fill('John')
    await page.getByTestId(TEST_ID.USERS.FORM.LAST_NAME_INPUT).fill('Doe')
    await page.getByTestId(TEST_ID.USERS.FORM.SUBMIT_BUTTON).click()

    await expect(page.getByTestId(TEST_ID.USERS.CREATE.SUCCESS_TOAST)).toBeVisible()
    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.CONTAINER)).toBeVisible()
  })
})
