<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store.ts'

const authStore = useAuthStore()

const router = useRouter()

onMounted(() => {
  authStore.logout()
  router.push({ name: 'auth-login' })
})
</script>

<template>
  <div />
</template>
