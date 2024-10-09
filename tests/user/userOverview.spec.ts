import { TEST_ID } from '@/constants/testId.constant.ts'
import { UserIndexDtoBuilder } from '@/models/user/index/userIndexDto.builder.js'
import { expect, test } from '@@/base.fixture'
import { InterceptorUtil } from '@@/utils/interceptor.util.ts'

test.describe('User Overview', () => {
  test('display users in the table', async ({ page }) => {
    const USER_1 = new UserIndexDtoBuilder()
      .withFirstName('John')
      .withLastName('Doe')
      .withBirthDate('2000-01-01')
      .build()

    const USER_2 = new UserIndexDtoBuilder()
      .withFirstName('Jane')
      .withLastName('Johnson')
      .withBirthDate('2010-01-01')
      .build()

    await InterceptorUtil.getPaginated(page, 'users*', [
      USER_1,
      USER_2,
    ])

    await page.goto('/users')

    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.UUID).nth(0)).toContainText(USER_1.uuid)
    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.FULL_NAME).nth(0)).toContainText('John Doe')
    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.BIRTH_DATE).nth(0)).toContainText('01/01/2000')

    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.UUID).nth(1)).toContainText(USER_2.uuid)
    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.FULL_NAME).nth(1)).toContainText('Jane Johnson')
    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.BIRTH_DATE).nth(1)).toContainText('01/01/2010')
  })
})
