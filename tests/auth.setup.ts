import { test as setup } from '@playwright/test'

import { TEST_ID } from '@/constants/testId.constant.ts'
import { RouteUtil } from '@@/utils/route.util.js'

const authFile = 'playwright/.auth/user.json'

const MOCK_TOKEN_RESPONSE = {
  access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIzOWVlOTdkNy0wOWI4LTQ1MDQtODI4Ni00ODg4OGNjMmI4MTkiLCJjaWQiOiIwY2UwMTljMC02MjQ5LTRlNDktOGQxNC05Njk5MmFjYTZmY2UiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6W10sImlhdCI6MTcyMDUxMjY2MCwiZXhwIjoxNzIwNTE2MjYwfQ.ISpAUy-Sb1nKjjyWj95xMqohLi4ganUhc4BzHN7gNAayCEtS07emMdD-jBtkCNC7Tlu-F03qr0XxyzPkmSCKYD7ibqgiwBgPOgrTQzq4SVgCeqX3X_tQOMnroVQj9LDNoRwudWnj83K0wnfIv5UyDK3cr7PxaUnMofu2U8BDnB7fTE6vMrETsDQfQRglGQOVJAvRJw92gWEhsXyCYSgm4gTlpUvdif5PpaszhDAfzGEsZvXtXsxlcbAaHxnSdi1vVVthmp2cxVWx90WYQha8yXHgN1eQMtEyyVMez2LVoNEQb0IZkfBmdG2TStX9PW1iT0c--E9ud-84sB-mv7I5Cg',
  expires_in: 3599,
  refresh_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aWQiOiIzOTMxNmFjMi0yODQ3LTQzODQtODQyYS1iY2QwMGI0M2MzNmQiLCJ1aWQiOiIzOWVlOTdkNy0wOWI4LTQ1MDQtODI4Ni00ODg4OGNjMmI4MTkiLCJjaWQiOiIwY2UwMTljMC02MjQ5LTRlNDktOGQxNC05Njk5MmFjYTZmY2UiLCJzY29wZSI6W10sImlhdCI6MTcyMDUxMjY2MCwiZXhwIjoxNzIxODMwMjYwfQ.MTMFQSVyasFBiB0RD_3G4_dLWwUjKbJawEjHJw9vubuVs-datmEs7zObe2QzsW_nAJ6qqicI5mJR5t2_cShtLWdlcCMz6QEMWF_bGp2SN49JeE4swkh9_reKSY8pOOwPpDm-L350tLfNR6PhTg0tnc9iE6c9Ad6E3oEL3VF70vCLugU_S4k2l2GfR3KdxEGMtyAUXnesQm5afwv29nMMLXL-nQhtgi1InVFNVZ4Yp8CptzHMNrM_gRt2vsTsZUBwjC6gnPH4bxxLHEnzz947NKp_nocJ2zkSuQSXiVag0KeQe7Lw_hJtT1Slz9Oo6agiMIVjxBWptrvCsInL_uUG9A',
  token_type: 'Bearer',
}

const USER_INFO_RESPONSE = {
  uuid: '39ee97d7-09b8-4504-8286-48888cc2b819',
  firstName: 'Wisemen',
  language: 'nl',
  lastName: 'Admin',
  mail: 'admin@wisemen.digital',
  role: 'admin',
}

setup('authenticate', async ({ page }) => {
  await RouteUtil.interceptData(page, '*/**/api/auth/token', MOCK_TOKEN_RESPONSE)
  await RouteUtil.interceptData(page, '*/**/api/auth/userinfo', USER_INFO_RESPONSE)

  await page.goto('login')
  await page.getByTestId(TEST_ID.AUTH.LOGIN.EMAIL_INPUT).fill('admin@wisemen.digital')
  await page.getByTestId(TEST_ID.AUTH.LOGIN.PASSWORD_INPUT).fill('admin')
  await page.getByTestId(TEST_ID.AUTH.LOGIN.SUBMIT_BUTTON).click()

  await page.context().storageState({ path: authFile })
})
