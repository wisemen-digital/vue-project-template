<script setup lang="ts">
import type { Form } from 'formango'

import type { forgotPasswordForm } from '@/models'

interface Props {
  form: Form<typeof forgotPasswordForm>
  lastLoginAttemptEmail: string | null
}

const {
  form,
  lastLoginAttemptEmail,
} = defineProps<Props>()

const { t } = useI18n()

const email = form.register('email', lastLoginAttemptEmail ?? undefined)
</script>

<template>
  <AppForm :form="form">
    <AppFormInput
      v-bind="email"
      :label="t('common.email')"
      :is-required="true"
      type="email"
    />

    <AuthFormSubmitButton :form="form">
      {{ t('auth.features.send_link') }}
    </AuthFormSubmitButton>
  </AppForm>
</template>
