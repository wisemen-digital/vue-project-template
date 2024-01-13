<script setup lang="ts">
import type { Form } from 'formango'

import type {
  CurrentUser,
  loginForm,
} from '@/models'

interface Props {
  form: Form<typeof loginForm>
  lastLoggedInUser: CurrentUser | null
}

const {
  form,
  lastLoggedInUser,
} = defineProps<Props>()

const { t } = useI18n()

const email = form.register('email', lastLoggedInUser?.email)
const password = form.register('password')
</script>

<template>
  <AppForm :form="form">
    <AppVerticalFormElementSpacer>
      <AppFormInput
        v-bind="email"
        :label="t('common.email')"
        :is-required="true"
        type="email"
      />

      <AppFormInput
        v-bind="password"
        :label="t('common.password')"
        :is-required="true"
        type="password"
      />

      <AppTypedRouterLink
        :to="{
          name: 'forgot-password-form',
        }"
        class="self-start"
      >
        <AppText
          variant="subtext"
        >
          {{ t('auth.features.forgot_password') }}
        </AppText>
      </AppTypedRouterLink>
    </AppVerticalFormElementSpacer>

    <AuthFormSubmitButton :form="form">
      {{ t('auth.features.log_in') }}
    </AuthFormSubmitButton>
  </AppForm>
</template>
