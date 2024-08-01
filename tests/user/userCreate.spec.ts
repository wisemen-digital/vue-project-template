import { test } from '@playwright/test'

import { TEST_ID } from '@/constants/testId.constant.ts'
import { RouteUtil } from '@@/utils/route.util.ts'

test.describe('User Create', () => {
  test('create a new user', async ({ page }) => {
    await RouteUtil.interceptPaginatedData(page, 'users*', [])
    await RouteUtil.interceptData('POST', page, 'users', {})

    await page.goto('/users')

    await page.getByTestId(TEST_ID.USERS.OVERVIEW.CREATE_BUTTON).click()

    await page.getByTestId(TEST_ID.USERS.FORM.FIRST_NAME_INPUT).fill('John')
    await page.getByTestId(TEST_ID.USERS.FORM.LAST_NAME_INPUT).fill('Doe')
    await page.getByTestId(TEST_ID.USERS.FORM.BIRTH_DATE_INPUT).fill('01/01/2000')

    await page.getByTestId(TEST_ID.USERS.FORM.SAVE_BUTTON).click()
  })
})
