import { ZitadelClient } from '@wisemen/vue-core-auth'

import {
  AUTH_BASE_URL,
  AUTH_CLIENT_ID,
  AUTH_ORGANIZATION_ID,
} from '@/constants/environment.constant.ts'
import { axios } from '@/libs/axios.lib'

export const oAuthClient = new ZitadelClient({
  clientId: AUTH_CLIENT_ID,
  organizationId: AUTH_ORGANIZATION_ID,
  axios,
  baseUrl: AUTH_BASE_URL,
  loginRedirectUri: `${window.location.origin}/auth/callback`,
  postLogoutRedirectUri: `${window.location.origin}/auth/logout`,
})
