import type { CreateAxiosDefaults } from 'axios'
import Axios from 'axios'

import { API_BASE_URL } from '@/constants/environment.constant.ts'
import { oAuthClient } from '@/libs/oAuth.lib'
import { useAuthStore } from '@/stores/auth.store.ts'

const axiosConfig: CreateAxiosDefaults = {
  baseURL: API_BASE_URL,
  headers: {
    'Accept-Language': navigator.language,
  },
}

export const axios = Axios.create(axiosConfig)

axios.interceptors.request.use((config) => oAuthClient.addAuthorizationHeader(config))

axios.interceptors.response.use(
  (config) => config,
  (error) => {
    if (!Axios.isAxiosError(error)) {
      return Promise.reject(error)
    }

    const status = error.response?.status ?? null

    if (status === 401) {
      const authStore = useAuthStore()

      authStore.logout()
    }

    return Promise.reject(error)
  },
)
