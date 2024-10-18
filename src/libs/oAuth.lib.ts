import { OAuth2ZitadelClient } from '@wisemen/oauth2-vue-client'
import axios from 'axios'

import {
  AUTH_BASE_URL,
  AUTH_CLIENT_ID,
  AUTH_ORGANIZATION_ID,
  CURRENT_ENVIRONMENT,
} from '@/constants/environment.constant.ts'

// export const oAuthClient = new OAuth2VueClient({
//   clientId: API_CLIENT_ID,
//   isMock: true,
//   axios,
//   clientSecret: API_CLIENT_SECRET,
//   tokenEndpoint: `${API_AUTH_URL}/token`,
// })

export const oAuthClient = new OAuth2ZitadelClient({
  authorization: {
    clientId: AUTH_CLIENT_ID,
    grantType: 'authorization_code',
    logoutUrl: `${AUTH_BASE_URL}/oidc/v1/end_session`,
    postLogoutRedirectUri: `${window.location.origin}/auth/logout`,
    redirectUri: `${window.location.origin}/auth/callback`,
    scopes: [
      'openid',
      'profile',
      'email',
      'offline_access',
      `urn:zitadel:iam:org:id:${AUTH_ORGANIZATION_ID}`,
    ],
    url: `${AUTH_BASE_URL}/oauth/v2/authorize`,
  },
  axios,
  offline: CURRENT_ENVIRONMENT === 'e2e',
  tokenEndpoint: `${AUTH_BASE_URL}/oauth/v2/token`,
  userInfoEndpoint: `${AUTH_BASE_URL}/oidc/v1/userinfo`,
})
