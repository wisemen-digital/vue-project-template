<script setup lang="ts">
import {
  AppButton,
  useLoading,
  useToast,
  useTypedRouter,
} from '@wisemen/vue-core'
import { useForm } from 'formango'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppGrid from '@/components/app/AppGrid.vue'
import type { CurrentUser } from '@/models/auth/current-user/currentUser.model'
import { loginStartSessionFormSchema } from '@/models/auth/login/loginStartSessionForm.model.ts'
import AuthPage from '@/modules/auth/components/AuthPage.vue'
import { useAuthStore } from '@/stores/auth.store.ts'

const authStore = useAuthStore()

const { lastLoggedInUser } = storeToRefs(authStore)

const { t } = useI18n()
const toast = useToast()
const router = useTypedRouter()

const loadingZitadel = useLoading()

const form = useForm({
  schema: loginStartSessionFormSchema,
})

const title = computed<string>(() => {
  if (lastLoggedInUser.value === null) {
    return t('auth.login.log_in')
  }

  return t('auth.login.welcome_back_name', {
    name: lastLoggedInUser.value.firstName,
  })
})

async function handleLoggedIn(user: CurrentUser): Promise<void> {
  authStore.setLastLoginAttemptEmail(null)
  authStore.setLastLoggedInUser(user)

  await router.replace({
    name: 'index',
  })
}

async function onLoginWithZitadelClick(): Promise<void> {
  try {
    loadingZitadel.setState(true)

    const loginUrl = await authStore.getLoginUrl()

    window.location.replace(loginUrl)
  }
  catch {
    loadingZitadel.setState(false)
    toast.error({
      title: t('auth.login.error_toast.title'),
      description: t('auth.login.error_toast.description'),
    })
  }
}

async function onLoginWithProviderClick(provider: 'apple' | 'google'): Promise<void> {
  try {
    loadingZitadel.setState(true)

    window.location.href = await authStore.getIdentityProviderLoginUrl(provider)
  }

  catch (error) {
    loadingZitadel.setState(false)
    toast.error({
      title: t('auth.login.error_toast.title'),
      description: error?.toString() ?? t('auth.login.error_toast.description'),
    })
  }
}

form.onSubmitFormError(() => {
  toast.error({
    title: t('error.invalid_form_input.title'),
    description: t('error.invalid_form_input.description'),
  })
})

form.onSubmitForm(async (data) => {
  try {
    await authStore.startSession(data.email)

    const currentUser = await authStore.getCurrentUser()

    await handleLoggedIn(currentUser)
  }
  catch (error) {
    toast.error({
      title: t('auth.login.error_toast.title'),
      description: error?.toString() ?? '',
    })
    authStore.setLastLoginAttemptEmail(data.email)
  }
})
</script>

<template>
  <AuthPage
    :description="t('auth.login.sign_in_to_continue')"
    :title="title"
  >
    <AppGrid
      :cols="1"
      class="w-full"
    >
      <AppButton
        @click="onLoginWithZitadelClick"
      >
        {{ t('auth.login.login_with_zitadel') }}
      </AppButton>
      <AppButton
        @click="onLoginWithProviderClick('apple')"
      >
        {{ t('auth.login.login_with_apple') }}
      </AppButton>
      <AppButton
        @click="onLoginWithProviderClick('google')"
      >
        {{ t('auth.login.login_with_google') }}
      </AppButton>
    </AppGrid>
  </AuthPage>
</template>
