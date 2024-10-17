<script setup lang="ts">
import { useRouteParams, useRouteQuery } from '@vueuse/router'
import {
  AppRouterLinkButton,
  useToast,
} from '@wisemen/vue-core'
import { useForm } from 'formango'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { resetPasswordFormSchema } from '@/models/auth/reset-password/resetPasswordForm.model'
import { useAuthResetPasswordMutation } from '@/modules/auth/api/mutations/authResetPassword.mutation.ts'
import AuthPage from '@/modules/auth/components/AuthPage.vue'
import ResetPasswordForm from '@/modules/auth/features/reset-password/components/AuthResetPasswordForm.vue'

const hasPasswordBeenReset = ref<boolean>(true)

const { t } = useI18n()
const toast = useToast()

const {
  form,
  onSubmitForm,
  onSubmitFormError,
} = useForm({
  schema: resetPasswordFormSchema,
})

const token = useRouteParams('token')
const email = useRouteQuery('email')

const errorToast = useApiErrorToast()

form.register('token', token.value as string)
form.register('email', email.value as string)

const resetPasswordMutation = useAuthResetPasswordMutation()

const description = computed<string>(() => {
  if (hasPasswordBeenReset.value) {
    return t('auth.reset_password.success.description')
  }

  return t('auth.reset_password.description')
})

onSubmitFormError(() => {
  toast.error({
    message: t('error.invalid_form_input.description'),
  })
})

onSubmitForm(async (values) => {
  try {
    await resetPasswordMutation.execute({
      body: values,
    })

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
        name: 'login',
      }"
    >
      {{ t('auth.reset_password.success.action') }}
    </AppRouterLinkButton>
  </AuthPage>
</template>
