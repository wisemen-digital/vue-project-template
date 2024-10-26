<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'
import {
  useToast,
  useTypedRouter,
} from '@wisemen/vue-core'
import { onMounted } from 'vue'

import { useI18n } from '@/composables/i18n/i18n.composable'
import { useAuthStore } from '@/stores/auth.store.ts'

const i18n = useI18n()
const router = useTypedRouter()
const authStore = useAuthStore()
const toast = useToast()
const code = useRouteQuery<string | undefined>('code')

onMounted(async () => {
  const authorizationCode = code.value ?? null

  if (authorizationCode === null) {
    toast.error({
      message: i18n.t('module.auth.login.error'),
    })

    await router.push({ name: 'auth-login' })

    return
  }
  try {
    await authStore.loginWithCode(authorizationCode)
    await router.push({ name: 'index' })
  }
  catch (error) {
    toast.error({
      message: error?.toString() ?? 'Unknown error',
    })
  }
})
</script>

<template>
  <div />
</template>
