<script setup lang="ts">
import {
  AppText,
  FormInput,
  FormPasswordInput,
} from '@wisemen/vue-core'
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppVerticalFormElementSpacer from '@/components/app/AppVerticalFormElementSpacer.vue'
import AppTypedRouterLink from '@/components/app/link/AppTypedRouterLink.vue'
import AppForm from '@/components/form/AppForm.vue'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { CurrentUser } from '@/models/auth/current-user/currentUser.model'
import type { loginFormSchema } from '@/models/auth/login/loginForm.model'
import AuthFormSubmitButton from '@/modules/auth/components/AuthFormSubmitButton.vue'

const props = defineProps<{
  form: Form<typeof loginFormSchema>
  lastLoggedInUser: CurrentUser | null
}>()

const { t } = useI18n()

const email = props.form.register('email', props.lastLoggedInUser?.email)
const password = props.form.register('password')
</script>

<template>
  <AppForm
    :form="form"
    :can-exit-when-dirty="true"
  >
    <AppVerticalFormElementSpacer>
      <FormInput
        v-bind="email"
        :data-test-id="TEST_ID.AUTH.LOGIN.EMAIL_INPUT"
        :is-required="true"
        :label="t('form.fields.email')"
        placeholder="email@example.com"
        type="email"
      />

      <FormPasswordInput
        v-bind="password"
        :data-test-id="TEST_ID.AUTH.LOGIN.PASSWORD_INPUT"
        :is-required="true"
        :label="t('form.fields.password')"
        :placeholder="t('form.fields.password')"
      />

      <AppTypedRouterLink
        :to="{
          name: 'auth-forgot-password',
        }"
      >
        <AppText
          class="font-medium text-primary"
          variant="subtext"
        >
          {{ t('auth.login.forgot_password') }}
        </AppText>
      </AppTypedRouterLink>
    </AppVerticalFormElementSpacer>

    <AuthFormSubmitButton
      :data-test-id="TEST_ID.AUTH.LOGIN.SUBMIT_BUTTON"
      :label="t('auth.login.log_in')"
      :form="form"
    />
  </AppForm>
</template>
