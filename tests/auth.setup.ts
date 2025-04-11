import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sign from 'jwt-encode'
import { HttpResponse } from 'msw'

import {
  Locale,
  Permission,
} from '@/client'
import { TEST_ID } from '@/constants/testId.constant.ts'
import { UserDetailDtoBuilder } from '@/models/user/detail/userDetailDto.builder.ts'
import { SettingsPreferenceDtoBuilder } from '@/modules/settings/models/preference/settingsPreferenceDto.builder.ts'
import {
  expect,
  test,
} from '@@/base.fixture.ts'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory
const authFile = path.join(__dirname, '../tests/.auth/user.json')

interface Token {
  exp: number
}

function encodeJwt(token: Token): string {
  return sign(token, 'secret')
}

test('authenticate', async ({
  http,
  page,
  worker,
}) => {
  await worker.use(
    http.post('*/oauth/v2/token', () => {
      return HttpResponse.json({
        access_token: encodeJwt({ exp: new Date(new Date().getFullYear() + 1, 0, 1).getTime() }),
        expires_in: 43_199,
        id_token: encodeJwt({ exp: new Date(new Date().getFullYear() + 1, 0, 1).getTime() }),
        refresh_token: 'refresh_token',
        token_type: 'Bearer',
      })
    }),
    http.get('*/api/v1/users/me', () => {
      const USER = new UserDetailDtoBuilder()
        .withPermissions([
          Permission.ALL_PERMISSIONS,
        ])
        .build()

      return HttpResponse.json(USER)
    }),
    http.get('*/api/v1/me/ui-preferences', () => {
      const data = new SettingsPreferenceDtoBuilder()
        .withLanguage(Locale.EN_US)
        .build()

      return HttpResponse.json(data)
    }),
  )

  await page.goto('/auth/login')

  await page.getByTestId(TEST_ID.AUTH.LOGIN.SUBMIT_BUTTON).click()

  await page.goto('/auth/callback?code=123')

  await page.waitForLoadState()

  await page.getByTestId(TEST_ID.APP_PAGE.USER_BUTTON).click()

  await expect(page.getByTestId(TEST_ID.APP_PAGE.USER_NAME)).toContainText('John Doe')

  await page.context().storageState({ path: authFile })
})
