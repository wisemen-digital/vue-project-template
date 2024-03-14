import type { CurrentUser } from './current-user/currentUser.model'
import type { CurrentUserDto } from './current-user/currentUserDto.model'
import type { ForgotPasswordDto } from './forgot-password/forgotPasswordDto.model'
import type { ForgotPasswordForm } from './forgot-password/forgotPasswordForm.model'
import type { LoginDto } from './login/loginDto.model'
import type { LoginForm } from './login/loginForm.model'
import type { ResetPasswordDto } from './reset-password/resetPasswordDto.model'
import type { ResetPasswordForm } from './reset-password/resetPasswordForm.model'

export function transformLoginFormToLoginDto(data: LoginForm): LoginDto {
  return {
    password: data.password,
    username: data.email,
  }
}

export function transformForgotPasswordFormToForgotPasswordDto(data: ForgotPasswordForm): ForgotPasswordDto {
  return {
    email: data.email,
  }
}

export function transformResetPasswordFormToResetPasswordDto(data: ResetPasswordForm): ResetPasswordDto {
  return {
    email: data.email,
    password: data.password,
    passwordConfirmation: data.password,
    token: data.token,
  }
}

export function transformCurrentUserDtoToCurrentUser(data: CurrentUserDto): CurrentUser {
  return {
    email: data.email,
    firstName: data.firstName,
    fullName: `${data.firstName} ${data.lastName}`,
    lastName: data.lastName,
    uuid: data.uuid,
  }
}
