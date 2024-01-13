import { addAuthorizationHeader } from '@appwise/oauth2-vue-client'
import type { CreateAxiosDefaults } from 'axios'
import Axios from 'axios'

import { routerPlugin } from '@/plugins'
import { useAuthStore } from '@/stores'

import { oAuthClient } from './oAuth.lib'

const {
  VITE_API_BASE_URL,
  VITE_API_ENDPOINT,
} = import.meta.env

const axiosConfig: CreateAxiosDefaults = {
  baseURL: `${VITE_API_BASE_URL}${VITE_API_ENDPOINT}`,
  headers: {
    'Accept-Language': navigator.language,
  },
}

export const axios = Axios.create(axiosConfig)
export const unauthorizedAxios = Axios.create(axiosConfig)

axios.interceptors.request.use(config => addAuthorizationHeader(oAuthClient, config))

axios.interceptors.response.use(
  config => config,
  async (error) => {
    if (!Axios.isAxiosError(error))
      return Promise.reject(error)

    const status = error.response?.status ?? null

    if (status === 401) {
      const authStore = useAuthStore()
      authStore.logout()

      await routerPlugin.replace({
        name: 'login-form',
      })
    }

    return Promise.reject(error)
  },
)
