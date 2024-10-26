import { API_AUTH_URL } from '@/constants/environment.constant'
import { httpClient } from '@/libs/http.lib'
import { AuthUserTransformer } from '@/models/auth-user/auth.transformer'
import type { AuthUser } from '@/models/auth-user/authUser.model'
import { authUserDtoSchema } from '@/models/auth-user/authUserDto.model'

export class AuthService {
  static async getAuthUser(): Promise<AuthUser> {
    const data = await httpClient.get({
      config: {
        baseURL: API_AUTH_URL,
      },
      responseSchema: authUserDtoSchema,
      url: '/userinfo',
    })

    return AuthUserTransformer.fromDto(data)
  }
}
