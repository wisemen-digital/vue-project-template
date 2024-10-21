<script setup lang="ts">
import {
  AppButton,
  useLoading,
  useToast,
} from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import AuthPage from '@/modules/auth/components/AuthPage.vue'
import { useAuthStore } from '@/stores/auth.store.ts'

const authStore = useAuthStore()

const i18n = useI18n()

const toast = useToast()
const loadingState = useLoading()

async function onLoginButtonClick(): Promise<void> {
  try {
    loadingState.setState(true)
    window.location.href = await authStore.getLoginUrl()
  }
  catch (error) {
    loadingState.setState(false)
    toast.error({
      title: i18n.t('auth.callback.login_error.title'),
      description: error?.toString(),
    })
  }
}
</script>

<template>
  <AuthPage
    :description="i18n.t('auth.login.sign_in_to_continue')"
    :title="i18n.t('auth.login.log_in')"
  >
    <AppButton
      :is-loading="loadingState.state.value"
      @click="onLoginButtonClick"
    >
      {{ i18n.t('auth.login.log_in') }}
    </AppButton>
  </AuthPage>
</template>
