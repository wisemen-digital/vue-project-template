<script setup lang="ts">
import { FormPasswordInput } from '@wisemen/vue-core'
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppForm from '@/components/form/AppForm.vue'
import type { resetPasswordFormSchema } from '@/models/auth/reset-password/resetPasswordForm.model'
import AuthFormSubmitButton from '@/modules/auth/components/AuthFormSubmitButton.vue'

const props = defineProps<{
  form: Form<typeof resetPasswordFormSchema>
}>()

const { t } = useI18n()

const password = props.form.register('password')
</script>

<template>
  <AppForm :form="form">
    <FormPasswordInput
      v-bind="password"
      :label="t('form.fields.password')"
      type="password"
    />

    <AuthFormSubmitButton
      :form="form"
      :label="t('auth.reset_password.action')"
    />
  </AppForm>
</template>
