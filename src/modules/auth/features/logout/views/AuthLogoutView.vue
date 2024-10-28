<script lang="ts" setup>
import { onMounted } from 'vue'

import { useAuthStore } from '@/stores/auth.store.ts'

const authStore = useAuthStore()

onMounted(() => {
  authStore.logout()
})
</script>

<template>
  <div />
</template>
