<script setup lang="ts">
import {
  AppConfigProvider,
  AppDialogContainer,
  AppThemeProvider,
  AppToastContainer,
  useDarkMode,
  useDocumentTitle,
} from '@wisemen/vue-core'
import { RouterView, useRouter } from 'vue-router'

import AppPageLoader from '@/components/app/loader/AppPageLoader.vue'
import { useRefreshPrompt } from '@/composables/refresh-prompt/refreshPrompt.composable'
import { logBuildInformation } from '@/constants/environment.constant.ts'
import { useAuthStore } from '@/stores/auth.store.ts'

const { setTemplate } = useDocumentTitle()
const router = useRouter()
const darkMode = useDarkMode()
const authStore = useAuthStore()

setTemplate('{title} | App')

useRefreshPrompt()
logBuildInformation()

authStore.onLogout(() => {
  router.replace({
    name: 'auth-login',
  })
})
</script>

<template>
  <AppConfigProvider locale="en">
    <AppThemeProvider
      :theme="darkMode.isEnabled.value ? 'dark' : 'light'"
      class="flex size-full flex-1 flex-col"
    >
      <RouterView />
      <AppPageLoader />
      <AppDialogContainer />
      <AppToastContainer />
    </AppThemeProvider>
  </AppConfigProvider>
</template>

<style lang="scss">
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.view-transition {
  view-transition-name: title;
}

::view-transition-old(title) {
  animation: 0.1s linear both fade-out;
}

::view-transition-new(title) {
  animation: 0.3s linear both fade-in;
}

::view-transition-old(root) {
  // animation: 0;
}

::view-transition-new(root) {
  // animation: 0;
}
</style>
