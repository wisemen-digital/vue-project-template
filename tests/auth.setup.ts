import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { TEST_ID } from '@/constants/testId.constant.ts'
import { expect, test } from '@@/base.fixture.ts'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory
const authFile = path.join(__dirname, '../tests/.auth/user.json')

test('authenticate', async ({ page }) => {
  await page.goto('/auth/login')

  await page.getByTestId(TEST_ID.AUTH.LOGIN.SUBMIT_BUTTON).click()

  await page.goto('/auth/callback?code=123')

  await expect(page.getByTestId(TEST_ID.AUTH.CALLBACK)).toBeVisible()

  await page.waitForLoadState()

  await page.getByTestId(TEST_ID.APP_PAGE.USER_BUTTON).click()

  await expect(page.getByTestId(TEST_ID.APP_PAGE.USER_NAME)).toContainText('John Doe')

  await page.context().storageState({ path: authFile })
})
