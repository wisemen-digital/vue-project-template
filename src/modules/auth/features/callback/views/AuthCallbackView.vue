<script lang="ts" setup>
import {
  useToast,
  useTypedRouteQuery,
  useTypedRouter,
} from '@wisemen/vue-core'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '@/stores/auth.store.ts'

const i18n = useI18n()
const router = useTypedRouter()
const authStore = useAuthStore()

const toast = useToast()

const routeQuery = useTypedRouteQuery('auth-callback')

onMounted(async () => {
  const authorizationCode = routeQuery.code.value

  if (authorizationCode === undefined) {
    toast.error({
      title: i18n.t('auth.callback.login_error.title'),
      description: i18n.t('auth.callback.login_error.description'),
    })
    await router.push({ name: 'auth-login' })

    return
  }

  try {
    await authStore.login(authorizationCode)
    await router.push({ name: 'index' })
  }
  catch (error) {
    toast.error({
      title: i18n.t('auth.callback.login_error.title'),
      description: error?.toString(),
    })
  }
})
</script>

<template>
  <div />
</template>
