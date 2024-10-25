import type { ZitadelUser } from '@wisemen/oauth2-vue-client'

import type { CurrentUser } from './current-user/currentUser.model'
import type { ForgotPasswordDto } from './forgot-password/forgotPasswordDto.model'
import type { ForgotPasswordForm } from './forgot-password/forgotPasswordForm.model'
import type { LoginDto } from './login/loginDto.model'
import type { LoginForm } from './login/loginForm.model'
import type { ResetPasswordDto } from './reset-password/resetPasswordDto.model'
import type { ResetPasswordForm } from './reset-password/resetPasswordForm.model'

export class AuthTransformer {
  static toCurrentUser(dto: ZitadelUser): CurrentUser {
    return {
      uuid: dto.sub,
      email: dto.email,
      firstName: dto.given_name,
      fullName: dto.name,
      lastName: dto.family_name,
    }
  }

  static toForgotPasswordDto(form: ForgotPasswordForm): ForgotPasswordDto {
    return {
      email: form.email,
    }
  }

  static toLoginDto(form: LoginForm): LoginDto {
    return {
      password: form.password,
      username: form.email,
    }
  }

  static toResetPasswordDto(form: ResetPasswordForm): ResetPasswordDto {
    return {
      email: form.email,
      password: form.password,
      passwordConfirmation: form.password,
      token: form.token,
    }
  }
}
