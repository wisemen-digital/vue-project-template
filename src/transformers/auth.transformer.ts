/* eslint-disable camelcase */
import type { CurrentUser, CurrentUserResponseDto } from '@/models/auth/currentUser.model.ts'
import type { ForgotPasswordForm } from '@/models/auth/forms/forgotPasswordForm.model.ts'
import type { ForgotPasswordRequestDto } from '@/models/auth/forms/forgotPasswordRequestDto.model.ts'
import type { LoginForm } from '@/models/auth/forms/loginForm.model.ts'
import type { LoginRequestDto } from '@/models/auth/forms/loginRequestDto.model.ts'
import type { ResetPasswordForm } from '@/models/auth/forms/resetPasswordForm.model.ts'
import type { ResetPasswordRequestDto } from '@/models/auth/forms/resetPasswordRequestDto.model.ts'

export function mapLoginFormToLoginRequestDto(data: LoginForm): LoginRequestDto {
	return {
		username: data.email,
		password: data.password,
	}
}

export function mapForgotPasswordFormToForgotPasswordRequestDto(data: ForgotPasswordForm): ForgotPasswordRequestDto {
	return {
		email: data.email,
	}
}

export function mapResetPasswordFormToResetPasswordRequestDto(
	data: ResetPasswordForm & { token: string; email: string }
): ResetPasswordRequestDto {
	return {
		token: data.token,
		email: data.email,
		password: data.password,
		password_confirmation: data.password,
	}
}

export function mapCurrentUserResponseDtoToCurrentUser(data: CurrentUserResponseDto): CurrentUser {
	return {
		id: data.id,
		email: data.email,
		firstName: data.first_name,
		lastName: data.last_name,
		fullName: `${data.first_name} ${data.last_name}`,
	}
}
