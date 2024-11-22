<script setup lang="ts">
import {
  useDarkMode,
  useDocumentTitle,
  VcConfigProvider,
  VcDialogContainer,
  VcThemeProvider,
  VcToastContainer,
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

setTemplate('{title} | $projectName')

useRefreshPrompt()
logBuildInformation()

authStore.onLogout(() => {
  router.replace({
    name: 'auth-login',
  })
})
</script>

<template>
  <VcConfigProvider locale="en">
    <VcThemeProvider
      :is-dark-mode-enabled="darkMode.isEnabled.value"
      theme="default"
      class="flex size-full flex-1 flex-col"
    >
      <RouterView />
      <AppPageLoader />
      <VcDialogContainer />
      <VcToastContainer />
    </VcThemeProvider>
  </VcConfigProvider>
</template>
