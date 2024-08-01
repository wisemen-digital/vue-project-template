import { OAuth2VueClient } from '@wisemen/oauth2-vue-client'
import axios from 'axios'

import {
  API_AUTH_URL,
  API_CLIENT_ID,
  API_CLIENT_SECRET,
  CURRENT_ENVIRONMENT,
} from '@/constants/environment.constant.ts'

const isMock = CURRENT_ENVIRONMENT === 'e2e'

console.log('isMock', isMock)

export const oAuthClient = new OAuth2VueClient({
  clientId: API_CLIENT_ID,
  isMock: true,
  axios,
  clientSecret: API_CLIENT_SECRET,
  tokenEndpoint: `${API_AUTH_URL}/token`,
})
