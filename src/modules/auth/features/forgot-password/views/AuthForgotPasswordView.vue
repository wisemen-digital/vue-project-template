<script setup lang="ts">
import { AppButton } from '@wisemen/vue-core'
import { useForm } from 'formango'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useApiErrorToast } from '@/composables/error-toast/apiErrorToast.composable'
import { forgotPasswordFormSchema } from '@/models/auth/forgot-password/forgotPasswordForm.model'
import { useAuthForgotPasswordMutation } from '@/modules/auth/api/mutations/authForgotPassword.mutation.ts'
import AuthPage from '@/modules/auth/components/AuthPage.vue'
import AuthForgotPasswordForm from '@/modules/auth/features/forgot-password/components/AuthForgotPasswordForm.vue'
import { useAuthStore } from '@/stores/auth.store.ts'

const authStore = useAuthStore()

const { lastLoginAttemptEmail } = storeToRefs(authStore)

const hasResetPassword = ref<boolean>(false)

const { t } = useI18n()
const errorToast = useApiErrorToast()

const resetEmail = ref<string>('')

const { form, onSubmitForm } = useForm({
  schema: forgotPasswordFormSchema,
})

const forgotPasswordMutation = useAuthForgotPasswordMutation()

const title = computed<string>(() => {
  if (hasResetPassword.value) {
    return t('auth.check_your_email')
  }

  return t('auth.forgot_password')
})

const description = computed<string>(() => {
  if (hasResetPassword.value) {
    return t('auth.instruction_email_sent_to', { email: resetEmail.value })
  }

  return t('auth.forgot_password_message')
})

onSubmitForm(async (values) => {
  try {
    await forgotPasswordMutation.execute({
      body: values,
    })

    hasResetPassword.value = true
    resetEmail.value = values.email
  }
  catch (error) {
    errorToast.show(error)
  }
})
</script>

<template>
  <AuthPage
    :description="description"
    :title="title"
  >
    <AuthForgotPasswordForm
      v-if="!hasResetPassword"
      :form="form"
      :last-login-attempt-email="lastLoginAttemptEmail"
    />

    <div class="mt-4 flex justify-center">
      <AppButton
        :to="{ name: 'login' }"
        icon-left="arrowLeft"
        variant="ghost"
      >
        {{ t('auth.back_to_login') }}
      </AppButton>
    </div>
  </AuthPage>
</template>
