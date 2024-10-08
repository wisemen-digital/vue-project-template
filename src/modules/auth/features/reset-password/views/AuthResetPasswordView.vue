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
import { useAuthResetPasswordMutation } from '@/modules/auth/api/mutations/authResetPassword.mutation.ts'
import AuthPage from '@/modules/auth/components/AuthPage.vue'
import ResetPasswordForm from '@/modules/auth/features/reset-password/components/AuthResetPasswordForm.vue'

const hasPasswordBeenReset = ref<boolean>(true)

const { t } = useI18n()
const toast = useToast()
const errorToast = useApiErrorToast()

const {
  form,
  onSubmitForm,
  onSubmitFormError,
} = useForm({
  schema: resetPasswordFormSchema,
})

const routeParams = useTypedRouteParams('reset-password')
const queryParams = useTypedRouteQuery('reset-password')

form.register('token', routeParams.token.value)
form.register('email', queryParams.email.value)

const resetPasswordMutation = useAuthResetPasswordMutation()

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
