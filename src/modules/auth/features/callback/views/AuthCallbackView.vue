<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'
import { useToast } from '@wisemen/vue-core'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useI18n } from '@/composables/i18n/i18n.composable'
import { useAuthStore } from '@/stores/auth.store.ts'

const i18n = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()
const authorizationCode = useRouteQuery<null | string>('code', null)

onMounted(async () => {
  if (authorizationCode.value === null) {
    toast.error({
      message: i18n.t('module.auth.login.error'),
    })

    await router.push({
      name: 'auth-login',
    })

    return
  }
  try {
    await authStore.loginWithCode(authorizationCode.value)

    await router.push({
      name: 'index',
    })
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
