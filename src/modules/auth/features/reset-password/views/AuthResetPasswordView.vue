<script setup lang="ts">
import {
  AppRouterLinkButton,
  useApiErrorToast,
  useToast,
  useTypedRouteParams,
  useTypedRouteQuery,
} from '@wisemen/vue-core'
import { useForm } from 'formango'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { resetPasswordFormSchema } from '@/models/auth/reset-password/resetPasswordForm.model'
import AuthPage from '@/modules/auth/components/AuthPage.vue'
import ResetPasswordForm from '@/modules/auth/features/reset-password/components/AuthResetPasswordForm.vue'
import { useAuthStore } from '@/stores/auth.store.ts'

const hasPasswordBeenReset = ref<boolean>(true)

const { t } = useI18n()
const toast = useToast()
const errorToast = useApiErrorToast()

const authStore = useAuthStore()

const {
  form,
  onSubmitForm,
  onSubmitFormError,
} = useForm({
  schema: resetPasswordFormSchema,
})

const routeParams = useTypedRouteParams('auth-reset-password')
const queryParams = useTypedRouteQuery('auth-reset-password')

form.register('token', routeParams.token.value)
form.register('email', queryParams.email.value)

const description = computed<string>(() => {
  if (hasPasswordBeenReset.value) {
    return t('auth.reset_password.success.description')
  }

  return t('auth.reset_password.description')
})

onSubmitFormError(() => {
  toast.error({
    title: t('error.invalid_form_input.title'),
    description: t('error.invalid_form_input.description'),
  })
})

onSubmitForm(async (values) => {
  try {
    await authStore.resetPassword(values)

    hasPasswordBeenReset.value = true
  }
  catch (error) {
    errorToast.show(error)
  }
})
</script>

<template>
  <AuthPage
    :description="description"
    :title="t('auth.reset_password.title')"
  >
    <ResetPasswordForm
      v-if="!hasPasswordBeenReset"
      :form="form"
    />

    <AppRouterLinkButton
      v-else
      :to="{
        name: 'auth-login',
      }"
    >
      {{ t('auth.reset_password.success.action') }}
    </AppRouterLinkButton>
  </AuthPage>
</template>
