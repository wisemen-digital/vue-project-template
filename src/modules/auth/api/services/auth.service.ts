import { z } from 'zod'

import { httpClient, unauthorizedHttpClient } from '@/libs/http.lib'
import type { CurrentUser } from '@/models/auth/currentUser.model'
import { currentUserResponseDto } from '@/models/auth/currentUser.model'
import type { ForgotPasswordRequestDto } from '@/models/auth/forms/forgotPasswordRequestDto.model'
import type { ResetPasswordRequestDto } from '@/models/auth/forms/resetPasswordRequestDto.model'
import { mapCurrentUserResponseDtoToCurrentUser } from '@/transformers/auth.transformer'

interface AuthService {
	forgotPassword: (body: ForgotPasswordRequestDto) => Promise<unknown>
	resetPassword: (body: ResetPasswordRequestDto) => Promise<unknown>
	getCurrentUser: () => Promise<CurrentUser>
}

export const authService: AuthService = {
	forgotPassword: (body: ForgotPasswordRequestDto) => {
		return unauthorizedHttpClient.post({
			url: '/forgot-password',
			body,
			responseSchema: z.unknown(),
		})
	},
	resetPassword: (body: ResetPasswordRequestDto) => {
		return unauthorizedHttpClient.post({
			url: '/reset-password',
			body,
			responseSchema: z.unknown(),
		})
	},
	getCurrentUser: async () => {
		const data = await httpClient.get({
			url: '/users/me',
			responseSchema: currentUserResponseDto,
		})

		return mapCurrentUserResponseDtoToCurrentUser(data)
	},
}
