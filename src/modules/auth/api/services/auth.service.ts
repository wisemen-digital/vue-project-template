import { z } from 'zod'

import { unauthorizedHttpClient } from '@/libs/http.lib'
import type { ForgotPasswordRequestDto } from '@/models/auth/forms/forgotPasswordRequestDto.model'
import type { ResetPasswordRequestDto } from '@/models/auth/forms/resetPasswordRequestDto.model'

interface AuthService {
	forgotPassword: (body: ForgotPasswordRequestDto) => Promise<void>
	resetPassword: (body: ResetPasswordRequestDto) => Promise<void>
}

export const authService: AuthService = {
	forgotPassword: (body) => {
		return unauthorizedHttpClient.post({
			url: '/forgot-password',
			body,
			responseSchema: z.any(),
		})
	},
	resetPassword: (body) => {
		return unauthorizedHttpClient.post({
			url: '/reset-password',
			body,
			responseSchema: z.any(),
		})
	},
}
