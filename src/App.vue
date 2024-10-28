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

useDarkMode()
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
