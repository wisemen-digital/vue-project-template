<script setup lang="ts">
import type { Form } from 'formango'

import type { resetPasswordForm } from '@/models'

interface Props {
  form: Form<typeof resetPasswordForm>
}

const { form } = defineProps<Props>()

const { t } = useI18n()

const password = form.register('password')
</script>

<template>
  <AppForm :form="form">
    <AppFormInput
      v-bind="password"
      :label="t('common.password')"
      type="password"
    />

    <AuthFormSubmitButton :form="form">
      {{ t('common.reset_password') }}
    </AuthFormSubmitButton>
  </AppForm>
</template>
