<script setup lang="ts">
import { useForm } from 'formango'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useApiErrorToast } from '@/composables/error-toast/apiErrorToast.composable'
import { useTypedRouteParams } from '@/composables/router/typedRouteParams.composable'
import { useTypedRouteQuery } from '@/composables/router/typedRouteQuery.composable'
import { resetPasswordFormSchema } from '@/models/auth/reset-password/resetPasswordForm.model'
import { useAuthResetPasswordMutation } from '@/modules/auth/api/mutations/authResetPassword.mutation.ts'
import AuthPage from '@/modules/auth/components/AuthPage.vue'

import ResetPasswordForm from '../components/AuthResetPasswordForm.vue'

const hasPasswordBeenReset = ref<boolean>(false)

const { t } = useI18n()
const errorToast = useApiErrorToast()

const { form, onSubmitForm } = useForm({
  schema: resetPasswordFormSchema,
})

const routeParams = useTypedRouteParams('reset-password')
const queryParams = useTypedRouteQuery('reset-password')

form.register('token', routeParams.token.value)
form.register('email', queryParams.email.value)

const resetPasswordMutation = useAuthResetPasswordMutation()

const description = computed<string>(() => {
  if (hasPasswordBeenReset.value) {
    return t('auth.features.your_password_has_been_reset_you_can')
  }

  return t('auth.reset_password.description')
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
  </AuthPage>
</template>
