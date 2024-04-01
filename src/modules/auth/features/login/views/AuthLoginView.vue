<script setup lang="ts">
import { useToast } from '@wisemen/vue-core'
import { AxiosError } from 'axios'
import { useForm } from 'formango'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useTypedRouter } from '@/composables/router/typedRouter.composable'
import type { CurrentUser } from '@/models/auth/current-user/currentUser.model'
import { loginFormSchema } from '@/models/auth/login/loginForm.model'
import AuthPage from '@/modules/auth/components/AuthPage.vue'
import AuthLoginForm from '@/modules/auth/features/login/components/AuthLoginForm.vue'
import { useAuthStore } from '@/stores/auth.store.ts'

const authStore = useAuthStore()

const { lastLoggedInUser } = storeToRefs(authStore)

const { t } = useI18n()
const toast = useToast()
const router = useTypedRouter()

const { form, onSubmitForm } = useForm({
  schema: loginFormSchema,
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

function handleLoginError(error: unknown): void {
  if (error instanceof AxiosError) {
    form.addErrors({
      password: {
        _errors: [
          t('auth.login.invalid_email_or_password'),
        ],
      },
    })

    toast.error({
      description: t('auth.login.error_toast.description'),
      title: t('auth.login.error_toast.title'),
    })
  }
  else {
    throw error
  }
}

onSubmitForm(async (data) => {
  try {
    await authStore.login(data)
    const currentUser = await authStore.getCurrentUser()

    await handleLoggedIn(currentUser)
  }
  catch (error) {
    handleLoginError(error)
    authStore.setLastLoginAttemptEmail(data.email)
  }
})
</script>

<template>
  <AuthPage
    :description="t('auth.login.sign_in_to_continue')"
    :title="title"
  >
    <AuthLoginForm
      :form="form"
      :last-logged-in-user="lastLoggedInUser"
    />
  </AuthPage>
</template>
