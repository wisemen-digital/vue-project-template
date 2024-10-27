import { ZitadelClient } from '@wisemen/oauth2-vue-client'
import axios from 'axios'

import {
  AUTH_BASE_URL,
  AUTH_CLIENT_ID,
  AUTH_ORGANIZATION_ID,
  CURRENT_ENVIRONMENT,
} from '@/constants/environment.constant.ts'

export const oAuthClient = new ZitadelClient({
  clientId: AUTH_CLIENT_ID,
  organizationId: AUTH_ORGANIZATION_ID,
  axios,
  baseUrl: AUTH_BASE_URL,
  loginRedirectUri: `${window.location.origin}/auth/callback`,
  offline: CURRENT_ENVIRONMENT === 'e2e',
  postLogoutRedirectUri: `${window.location.origin}/auth/logout`,
})
