import { z } from 'zod'

import { httpClient, unauthorizedHttpClient } from '@/libs/http.lib'
import { AuthTransformer } from '@/models/auth/auth.transformer'
import type { CurrentUser } from '@/models/auth/current-user/currentUser.model'
import { currentUserDtoSchema } from '@/models/auth/current-user/currentUserDto.model'
import type { ForgotPasswordForm } from '@/models/auth/forgot-password/forgotPasswordForm.model'
import type { ResetPasswordForm } from '@/models/auth/reset-password/resetPasswordForm.model'

export class AuthService {
  static async forgotPassword(form: ForgotPasswordForm): Promise<void> {
    await unauthorizedHttpClient.post({
      body: AuthTransformer.toForgotPasswordDto(form),
      responseSchema: z.unknown(),
      url: '/forgot-password',
    })
  }

  static async getCurrentUser(): Promise<CurrentUser> {
    const data = await httpClient.get({
      config: {
        baseURL: import.meta.env.API_BASE_URL,
      },
      responseSchema: currentUserDtoSchema,
      url: '/api/auth/userinfo',
    })

    return AuthTransformer.toCurrentUser(data)
  }

  static async resetPassword(form: ResetPasswordForm): Promise<void> {
    await unauthorizedHttpClient.post({
      body: AuthTransformer.toResetPasswordDto(form),
      responseSchema: z.unknown(),
      url: '/reset-password',
    })
  }
}
