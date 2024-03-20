import { OAuth2VueClient } from '@appwise/oauth2-vue-client'
import axios from 'axios'

const API_CLIENT_ID = import.meta.env.API_CLIENT_ID
const API_CLIENT_SECRET = import.meta.env.API_CLIENT_SECRET
const API_BASE_URL = import.meta.env.API_BASE_URL

export const oAuthClient = new OAuth2VueClient({
  axios,
  clientId: API_CLIENT_ID,
  clientSecret: API_CLIENT_SECRET,
  tokenEndpoint: `${API_BASE_URL}/api/auth/token`,
})
