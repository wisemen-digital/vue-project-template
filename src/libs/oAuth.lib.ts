import { OAuth2VueClient } from '@appwise/oauth2-vue-client'
import axios from 'axios'

import {
  API_BASE_URL,
  API_CLIENT_ID,
  API_CLIENT_SECRET,
} from '@/constants/environment.constant.ts'

export const oAuthClient = new OAuth2VueClient({
  axios,
  clientId: API_CLIENT_ID,
  clientSecret: API_CLIENT_SECRET,
  tokenEndpoint: `${API_BASE_URL}/api/auth/token`,
})
