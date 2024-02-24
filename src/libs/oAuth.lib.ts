import { OAuth2VueClient } from '@appwise/oauth2-vue-client'
import axios from 'axios'

const { VITE_API_CLIENT_ID, VITE_API_CLIENT_SECRET, VITE_API_BASE_URL } = import.meta.env

export const oAuthClient = new OAuth2VueClient({
	axios,
	clientId: VITE_API_CLIENT_ID,
	clientSecret: VITE_API_CLIENT_SECRET,
	tokenEndpoint: `${VITE_API_BASE_URL}/api/auth/token`,
})
