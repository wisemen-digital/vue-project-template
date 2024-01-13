<script setup lang="ts">
import { useTypedRouter } from '@/composables/core'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
const router = useTypedRouter()

function logout(): void {
  authStore.logout()

  router.replace({
    name: 'login-form',
  })
}
</script>

<template>
  <AppPage title="Example">
    <div>
      <AppButton @click="logout">
        Log out
      </AppButton>
    </div>

    <AppImage
      src="https://vuejs.org/images/logo.png"
      class="h-8 w-8"
    />
  </AppPage>
</template>
