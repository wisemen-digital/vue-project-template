<script setup lang="ts">
import {
  AppRouterLinkButton,
  useApiErrorToast,
} from '@wisemen/vue-core'
import { useForm } from 'formango'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { forgotPasswordFormSchema } from '@/models/auth/forgot-password/forgotPasswordForm.model'
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

onSubmitForm((values) => {
  try {
    // TODO

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
        :to="{ name: 'auth-login' }"
        variant="ghost"
      >
        {{ t('auth.forgot_password.return_to_login') }}
      </AppRouterLinkButton>
    </div>
  </AuthPage>
</template>
