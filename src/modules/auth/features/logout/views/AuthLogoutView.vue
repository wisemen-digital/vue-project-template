<script lang="ts" setup>
import { useTypedRouter } from '@wisemen/vue-core'
import { onMounted } from 'vue'

import { useAuthStore } from '@/stores/auth.store.ts'

const router = useTypedRouter()
const authStore = useAuthStore()

onMounted(() => {
  authStore.logout()

  router.replace({
    name: 'auth-login',
  })
})
</script>

<template>
  <div />
</template>
