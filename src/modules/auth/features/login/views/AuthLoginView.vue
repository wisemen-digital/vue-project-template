<script setup lang="ts">
import { AppButton, useToast } from '@wisemen/vue-core'
import { ref } from 'vue'

import { useI18n } from '@/composables/i18n/i18n.composable'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const isSigningInWithZitadel = ref<boolean>(false)
const isSigningInWithApple = ref<boolean>(false)
const isSigningInWithGoogle = ref<boolean>(false)

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
  try {
    window.location.href = await authStore.getIdentityProviderLoginUrl(provider)
  }
  catch (error) {
    toast.error({
      message: error?.toString() ?? t('module.auth.login.error'),
    })
  }
}

async function onSignInWithApple(): Promise<void> {
  isSigningInWithApple.value = true

  try {
    await onSignInWithProvider('apple')
  }
  catch {
    isSigningInWithApple.value = false
  }
}

async function onSignInWithGoogle(): Promise<void> {
  isSigningInWithGoogle.value = true

  try {
    await onSignInWithProvider('google')
  }
  catch {
    isSigningInWithGoogle.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="text-center text-4xl font-bold text-primary">
      {{ t('module.auth.login.title') }}
    </h1>

    <p class="mt-2 text-center text-secondary">
      {{ t('module.auth.login.description') }}
    </p>

    <div class="mt-8 flex flex-col gap-y-1">
      <AppButton
        :is-loading="isSigningInWithZitadel"
        class="w-full"
        variant="secondary"
        @click="onSignInWithZitadel"
      >
        {{ t('module.auth.login.sign_in_with_zitadel') }}
      </AppButton>

      <AppButton
        :is-loading="isSigningInWithGoogle"
        icon-left="googleLogo"
        variant="secondary"
        @click="onSignInWithGoogle"
      >
        {{ t('module.auth.login.sign_in_with_google') }}
      </AppButton>

      <AppButton
        :is-loading="isSigningInWithApple"
        icon-left="appleLogo"
        variant="secondary"
        @click="onSignInWithApple"
      >
        {{ t('module.auth.login.sign_in_with_apple') }}
      </AppButton>
    </div>
  </div>
</template>
