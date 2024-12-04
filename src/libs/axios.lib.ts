import type { CreateAxiosDefaults } from 'axios'
import Axios from 'axios'

import { API_BASE_URL } from '@/constants/environment.constant.ts'
import { useAuthStore } from '@/stores/auth.store.ts'
import { LocaleUtil } from '@/utils/locale.util'

const axiosConfig: CreateAxiosDefaults = {
  baseURL: API_BASE_URL,
  headers: {
    'Accept-Language': LocaleUtil.getLocale(),
  },
}

export const axios = Axios.create(axiosConfig)

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
