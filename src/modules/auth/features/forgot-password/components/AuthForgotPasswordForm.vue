<script setup lang="ts">
import { FormInput } from '@wisemen/vue-core'
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppForm from '@/components/form/AppForm.vue'
import type { forgotPasswordFormSchema } from '@/models/auth/forgot-password/forgotPasswordForm.model'
import AuthFormSubmitButton from '@/modules/auth/components/AuthFormSubmitButton.vue'

const props = defineProps<{
  form: Form<typeof forgotPasswordFormSchema>
  lastLoginAttemptEmail: null | string
}>()

const { t } = useI18n()

const email = props.form.register('email', props.lastLoginAttemptEmail ?? undefined)
</script>

<template>
  <AppForm :form="form">
    <FormInput
      v-bind="email"
      :is-required="true"
      :label="t('form.fields.email')"
      :placeholder="t('auth.enter_your_email')"
      type="email"
    />

    <AuthFormSubmitButton
      :form="form"
      :is-always-enabled="true"
      :label="t('auth.reset_password')"
    />
  </AppForm>
</template>
