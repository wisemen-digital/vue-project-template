import type { CurrentUser, CurrentUserResponseDto } from '@/models/auth/currentUser.model.ts'
import type {
	ForgotPasswordForm,
	ForgotPasswordRequestDto,
	LoginForm,
	LoginRequestDto,
	ResetPasswordForm,
	ResetPasswordRequestDto,
} from '@/models/auth/forms'

export function mapLoginFormToLoginRequestDto(data: LoginForm): LoginRequestDto {
	const { email, password } = data

	return {
		username: email,
		password,
	}
}

export function mapForgotPasswordFormToForgotPasswordRequestDto(data: ForgotPasswordForm): ForgotPasswordRequestDto {
	const { email } = data

	return {
		email,
	}
}

export function mapResetPasswordFormToResetPasswordRequestDto(
	data: ResetPasswordForm & { token: string; email: string }
): ResetPasswordRequestDto {
	const { token, email, password } = data

	return {
		token,
		email,
		password,
		password_confirmation: password,
	}
}

export function mapCurrentUserResponseDtoToCurrentUser(data: CurrentUserResponseDto): CurrentUser {
	const { id, email, first_name: firstName, last_name: lastName } = data

	return {
		id,
		email,
		firstName,
		lastName,
		fullName: `${firstName} ${lastName}`,
	}
}
