<script setup lang="ts">
import { useForm } from 'formango'
import { storeToRefs } from 'pinia'

import { forgotPasswordForm } from '@/models'
import { useForgotPassword } from '@/modules/auth/api'
import { useForgotPasswordStore } from '@/modules/auth/stores'
import { mapForgotPasswordFormToForgotPasswordRequestDto } from '@/transformers'
import { mapApiErrors } from '@/utils/api.util'

const forgotPasswordStore = useForgotPasswordStore()

const { lastLoginAttemptEmail } = storeToRefs(forgotPasswordStore)

const hasResetPassword = ref<boolean>(false)

const { t } = useI18n()
const { form, onSubmitForm } = useForm(forgotPasswordForm)

const { execute: forgotPassword } = useForgotPassword()

const description = computed<string>(() => {
  if (hasResetPassword.value)
    return t('auth.features.thank_you_within_a_few_minutes_you')

  return t('auth.features.dont_remember_your_password_enter_your_email')
})

onSubmitForm(async (data) => {
  try {
    await forgotPassword({
      body: mapForgotPasswordFormToForgotPasswordRequestDto(data),
    })

    hasResetPassword.value = true
  }
  catch (error) {
    form.addErrors(mapApiErrors(error))
  }
})
</script>

<template>
  <AuthPage
    :title="t('auth.features.forgot_password')"
    :description="description"
  >
    <ForgotPasswordReturnToLoginButton v-if="hasResetPassword" />

    <ForgotPasswordForm
      v-else
      :form="form"
      :last-login-attempt-email="lastLoginAttemptEmail"
    />
  </AuthPage>
</template>
@/utils/api.util
