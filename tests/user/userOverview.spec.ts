import { HttpResponse } from 'msw'

import { UserIndexViewGenerator } from '@/client/generators.gen.ts'
import { TEST_ID } from '@/constants/testId.constant.ts'
import { expect, test } from '@@/base.fixture'
import { getPaginatedJson } from '@@/utils/interceptor.util.ts'

test('display users in the table', async ({ http, page, worker }) => {
  const USER_1 = UserIndexViewGenerator()
  const USER_2 = UserIndexViewGenerator()

  await worker.use(
    http.get('*/api/v1/users', () => {
      return HttpResponse.json(getPaginatedJson([
        USER_1,
        USER_2,
      ]))
    }),
  )

  await page.goto('/users')

  await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.FULL_NAME).nth(0))
    .toContainText(USER_1.email)
  await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.FULL_NAME).nth(1))
    .toContainText(USER_2.email)
})
