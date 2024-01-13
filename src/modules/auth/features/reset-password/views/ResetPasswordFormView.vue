<script setup lang="ts">
import { useForm } from 'formango'

import { useTypedRouteParams } from '@/composables/core'
import { resetPasswordForm } from '@/models'
import { useResetPassword } from '@/modules/auth/api'
import { mapResetPasswordFormToResetPasswordRequestDto } from '@/transformers'
import { mapApiErrors } from '@/utils/api.util'

const hasPasswordBeenReset = ref<boolean>(false)

const router = useRoute()
const { t } = useI18n()
const { form, onSubmitForm } = useForm(resetPasswordForm)
const { token } = useTypedRouteParams('reset-password-form')

const { email } = router.query

const { execute: resetPassword } = useResetPassword()

const description = computed<string>(() => {
  if (hasPasswordBeenReset.value)
    return t('auth.features.your_password_has_been_reset_you_can')

  return t('auth.features.enter_your_new_password_below')
})

onSubmitForm(async ({ password }) => {
  try {
    await resetPassword({
      body: mapResetPasswordFormToResetPasswordRequestDto({
        email: email as string,
        password,
        token,
      }),
    })

    hasPasswordBeenReset.value = true
  }
  catch (error) {
    form.addErrors(mapApiErrors(error))
  }
})
</script>

<template>
  <AuthPage
    :title="t('common.reset_password')"
    :description="description"
  >
    <ResetPasswordForm
      v-if="!hasPasswordBeenReset"
      :form="form"
    />
  </AuthPage>
</template>
@/utils/api.util
