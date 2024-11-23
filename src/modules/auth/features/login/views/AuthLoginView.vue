<script setup lang="ts">
import { useToast, VcButton } from '@wisemen/vue-core'
import { ref } from 'vue'

import { useI18n } from '@/composables/i18n/i18n.composable'
import AuthLoginElementTransition from '@/modules/auth/features/login/components/AuthLoginElementTransition.vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const isSigningInWithZitadel = ref<boolean>(false)

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
</script>

<template>
  <div class="grid h-dvh grid-cols-1 bg-primary md:grid-cols-2">
    <div class="relative flex flex-col justify-center px-3xl py-8xl">
      <div class="z-10 mx-auto w-full max-w-80">
        <div>
          <AuthLoginElementTransition delay-class="delay-0">
            <!-- Not sure why, but wihtout duration-100 the transition is bugged -->
            <h1 class="text-center text-4xl font-bold text-primary duration-100">
              {{ t('module.auth.login.title') }}
            </h1>
          </AuthLoginElementTransition>

          <AuthLoginElementTransition delay-class="delay-150">
            <!-- Not sure why, but wihtout duration-100 the transition is bugged -->
            <p class="relative mt-md text-center text-secondary duration-100">
              {{ t('module.auth.login.description') }}
            </p>
          </AuthLoginElementTransition>

          <div class="mt-4xl flex flex-col gap-y-md">
            <AuthLoginElementTransition delay-class="delay-300">
              <VcButton
                :is-loading="isSigningInWithZitadel"
                class="w-full"
                variant="secondary"
                @click="onSignInWithZitadel"
              >
                {{ t('module.auth.login.sign_in_with_zitadel') }}
              </VcButton>
            </AuthLoginElementTransition>
          </div>
        </div>
      </div>
    </div>

    <div class="h-full bg-secondary" />
  </div>
</template>
