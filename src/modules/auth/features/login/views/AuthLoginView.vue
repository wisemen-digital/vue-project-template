<script setup lang="ts">
import { useToast } from '@wisemen/vue-core'
import { VcButton } from '@wisemen/vue-core-components'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { TEST_ID } from '@/constants/testId.constant.ts'
import AuthLoginElementTransition from '@/modules/auth/features/login/components/AuthLoginElementTransition.vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const isSigningIn = ref<boolean>(false)

const i18n = useI18n()
const toast = useToast()

async function onSignInWithZitadel(): Promise<void> {
  isSigningIn.value = true

  try {
    const loginUrl = await authStore.getLoginUrl()

    window.location.replace(loginUrl)
  }
  catch {
    isSigningIn.value = false

    toast.error({ message: i18n.t('module.auth.login.error') })
  }
}
</script>

<template>
  <div
    class="
      bg-primary grid h-dvh grid-cols-1
      md:grid-cols-2
    "
  >
    <div class="px-3xl py-8xl relative flex flex-col justify-center">
      <div class="z-10 mx-auto w-full max-w-80">
        <div>
          <AuthLoginElementTransition delay-class="delay-0">
            <!-- Not sure why, but wihtout duration-100 the transition is bugged -->
            <h1 class="text-primary text-center text-4xl font-bold duration-100">
              {{ i18n.t('module.auth.login.title') }}
            </h1>
          </AuthLoginElementTransition>

          <AuthLoginElementTransition delay-class="delay-150">
            <!-- Not sure why, but wihtout duration-100 the transition is bugged -->
            <p class="mt-md text-secondary relative text-center duration-100">
              {{ i18n.t('module.auth.login.description') }}
            </p>
          </AuthLoginElementTransition>

          <div class="mt-4xl gap-y-md flex flex-col">
            <AuthLoginElementTransition delay-class="delay-300">
              <VcButton
                :is-loading="isSigningIn"
                :test-id="TEST_ID.AUTH.LOGIN.SUBMIT_BUTTON"
                class="w-full"
                variant="secondary"
                @click="onSignInWithZitadel"
              >
                {{ i18n.t('module.auth.login.sign_in') }}
              </VcButton>
            </AuthLoginElementTransition>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-secondary h-full" />
  </div>
</template>
