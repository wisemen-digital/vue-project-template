import { TEST_ID } from '@/constants/testId.constant'
import { RoleDtoBuilder } from '@/models/role/roleDto.builder.ts'
import { expect, test } from '@@/base.fixture'
import { InterceptorUtil } from '@@/utils/interceptor.util'

test.describe('Role Create', () => {
  test('create a new role', async ({ page }) => {
    await InterceptorUtil.get(page, 'roles*', [])

    const ROLE_1 = new RoleDtoBuilder().build()

    const createRequest = await InterceptorUtil.post(page, 'roles', ROLE_1)

    await page.goto('/settings/roles-and-permissions')

    await page.getByTestId(TEST_ID.SETTINGS.ROLES.OVERVIEW.CREATE_BUTTON).click()

    await expect(page.getByTestId(TEST_ID.SETTINGS.ROLES.CREATE_DIALOG)).toBeVisible()

    await page.getByTestId(TEST_ID.SETTINGS.ROLES.FORM.NAME_INPUT).fill('Editor')
    await page.getByTestId(TEST_ID.SETTINGS.ROLES.FORM.SUBMIT_BUTTON).click()

    await expect(page.getByTestId(TEST_ID.SETTINGS.ROLES.CREATE_DIALOG)).toBeHidden()
    expect(createRequest.getCount()).toBe(1)
  })
})
