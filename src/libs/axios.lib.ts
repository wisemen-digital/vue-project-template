import { addAuthorizationHeader } from '@appwise/oauth2-vue-client'
import type { CreateAxiosDefaults } from 'axios'
import Axios from 'axios'

import { API_AUTH_URL, API_BASE_URL } from '@/constants/environment.constant.ts'
import { routerPlugin } from '@/plugins/router/router.plugin.ts'
import { useAuthStore } from '@/stores/auth.store.ts'

import { oAuthClient } from './oAuth.lib'

const axiosConfig: CreateAxiosDefaults = {
  baseURL: API_BASE_URL,
  headers: {
    'Accept-Language': navigator.language,
  },
}

const axiosAuthConfig: CreateAxiosDefaults = {
  baseURL: API_AUTH_URL,
  headers: {
    'Accept-Language': navigator.language,
  },
}

export const axios = Axios.create(axiosConfig)
export const authAxios = Axios.create(axiosAuthConfig)

axios.interceptors.request.use(config => addAuthorizationHeader(oAuthClient, config))

axios.interceptors.response.use(
  config => config,
  async (error) => {
    if (!Axios.isAxiosError(error)) {
      return Promise.reject(error)
    }

    const status = error.response?.status ?? null

    if (status === 401) {
      const authStore = useAuthStore()
      authStore.logout()

      await routerPlugin.replace({
        name: 'login',
      })
    }

    return Promise.reject(error)
  },
)
