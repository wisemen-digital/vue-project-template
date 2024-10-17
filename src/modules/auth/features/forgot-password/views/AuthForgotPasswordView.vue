<script setup lang="ts">
import { AppRouterLinkButton } from '@wisemen/vue-core'
import { useForm } from 'formango'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
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
    return t('auth.forgot_password.success_title')
  }

  return t('auth.forgot_password.title')
})

const description = computed<string>(() => {
  if (hasResetPassword.value) {
    return t('auth.forgot_password.success_description', { email: resetEmail.value })
  }

  return t('auth.forgot_password.description')
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

    <div class="mt-2 flex justify-center">
      <AppRouterLinkButton
        :to="{
          name: 'login',
        }"
        :variant="hasResetPassword ? 'default' : 'tertiary'"
        class="w-full"
      >
        {{ t('auth.forgot_password.return_to_login') }}
      </AppRouterLinkButton>
    </div>
  </AuthPage>
</template>
