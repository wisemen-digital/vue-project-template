<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store.ts'

const router = useRouter()
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
