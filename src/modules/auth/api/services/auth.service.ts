import { z } from 'zod'

import { httpClient, unauthorizedHttpClient } from '@/libs/http.lib'
import {
  transformCurrentUserDtoToCurrentUser,
  transformForgotPasswordFormToForgotPasswordDto,
  transformResetPasswordFormToResetPasswordDto,
} from '@/models/auth/auth.transformer'
import type { CurrentUser } from '@/models/auth/current-user/currentUser.model'
import { currentUserDtoSchema } from '@/models/auth/current-user/currentUserDto.model'
import type { ForgotPasswordForm } from '@/models/auth/forgot-password/forgotPasswordForm.model'
import type { ResetPasswordForm } from '@/models/auth/reset-password/resetPasswordForm.model'

interface AuthService {
  forgotPassword: (body: ForgotPasswordForm) => Promise<void>
  getCurrentUser: () => Promise<CurrentUser>
  resetPassword: (body: ResetPasswordForm) => Promise<void>
}

export const authService: AuthService = {
  forgotPassword: async (form) => {
    await unauthorizedHttpClient.post({
      body: transformForgotPasswordFormToForgotPasswordDto(form),
      responseSchema: z.unknown(),
      url: '/forgot-password',
    })
  },
  getCurrentUser: async () => {
    const data = await httpClient.get({
      config: {
        baseURL: import.meta.env.API_BASE_URL,
      },
      responseSchema: currentUserDtoSchema,
      url: '/api/auth/userinfo',
    })

    return transformCurrentUserDtoToCurrentUser(data)
  },
  resetPassword: async (form) => {
    await unauthorizedHttpClient.post({
      body: transformResetPasswordFormToResetPasswordDto(form),
      responseSchema: z.unknown(),
      url: '/reset-password',
    })
  },
}
