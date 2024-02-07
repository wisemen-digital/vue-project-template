import { z } from 'zod'

import { httpClient, unauthorizedHttpClient } from '@/libs/http.lib'
import type { CurrentUser } from '@/models/auth/currentUser.model'
import { currentUserDto } from '@/models/auth/currentUser.model'
import type { ForgotPasswordRequestDto } from '@/models/auth/forms/forgotPasswordRequestDto.model'
import type { ResetPasswordRequestDto } from '@/models/auth/forms/resetPasswordRequestDto.model'
import { mapCurrentUserDtoToCurrentUser } from '@/transformers/auth.transformer'
import { useEnvironment } from '@/utils/environment.util'

interface AuthService {
	forgotPassword: (body: ForgotPasswordRequestDto) => Promise<void>
	resetPassword: (body: ResetPasswordRequestDto) => Promise<void>
	getCurrentUser: () => Promise<CurrentUser>
}

export const authService: AuthService = {
	forgotPassword: async (body: ForgotPasswordRequestDto): Promise<void> => {
		const { isDevelopment } = useEnvironment()

		if (isDevelopment.value) {
			return
		}

		await unauthorizedHttpClient.post({
			url: '/forgot-password',
			body,
			responseSchema: z.unknown(),
		})
	},
	resetPassword: async (body: ResetPasswordRequestDto): Promise<void> => {
		await unauthorizedHttpClient.post({
			url: '/reset-password',
			body,
			responseSchema: z.unknown(),
		})
	},
	getCurrentUser: async (): Promise<CurrentUser> => {
		const data = await httpClient.get({
			url: '/users/me',
			responseSchema: currentUserDto,
		})

		return mapCurrentUserDtoToCurrentUser(data)
	},
}
