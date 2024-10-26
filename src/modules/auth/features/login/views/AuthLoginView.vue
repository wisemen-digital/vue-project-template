<script setup lang="ts">
import { AppButton, useToast } from '@wisemen/vue-core'
import { ref } from 'vue'

import { useI18n } from '@/composables/i18n/i18n.composable'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const isSigningInWithZitadel = ref<boolean>(false)
const isSigningInWithProvider = ref<boolean>(false)

const { t } = useI18n()
const toast = useToast()

async function onSignInWithZitadel(): Promise<void> {
  isSigningInWithZitadel.value = true

  try {
    const loginUrl = await authStore.getLoginUrl()

    window.location.replace(loginUrl)
  }
  catch {
    isSigningInWithZitadel.value = false

    toast.error({
      message: t('module.auth.login.error'),
    })
  }
}

async function onSignInWithProvider(provider: 'apple' | 'google'): Promise<void> {
  isSigningInWithProvider.value = true

  try {
    window.location.href = await authStore.getIdentityProviderLoginUrl(provider)
  }
  catch (error) {
    isSigningInWithProvider.value = false

    toast.error({
      message: error?.toString() ?? t('module.auth.login.error'),
    })
  }
}
</script>

<template>
  <div>
    <AppButton @click="onSignInWithZitadel">
      {{ t('module.auth.login.sign_in_with_zitadel') }}
    </AppButton>

    <AppButton @click="onSignInWithProvider('google')">
      {{ t('module.auth.login.sign_in_with_google') }}
    </AppButton>

    <AppButton @click="onSignInWithProvider('apple')">
      {{ t('module.auth.login.sign_in_with_apple') }}
    </AppButton>
  </div>
</template>
