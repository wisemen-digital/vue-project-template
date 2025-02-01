import { client } from '@/client/client.gen.ts'
import { API_BASE_URL } from '@/constants/environment.constant.ts'
import { oAuthClient } from '@/libs/oAuth.lib.ts'
import { useAuthStore } from '@/stores/auth.store.ts'

export function setupHttpClient(): void {
  client.setConfig({
    baseUrl: API_BASE_URL,
    headers: {
      'Accept-Language': navigator.language,
    },
  })

  client.interceptors.request.use(async (request: Request): Promise<Request> => {
    const isLoggedIn = await oAuthClient.isLoggedIn()

    if (!isLoggedIn) {
      return request
    }

    if (request.headers.has('Authorization')) {
      return request
    }

    const token = await oAuthClient.getAccessToken()

    request.headers.set('Authorization', `Bearer ${token}`)

    return request
  })

  client.interceptors.response.use((response: Response): Response => {
    if (response?.status !== 401) {
      return response
    }

    const authStore = useAuthStore()

    authStore.logout()

    return response
  })
}
