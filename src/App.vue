<script setup lang="ts">
import {
  AppConfigProvider,
  AppDialogContainer,
  AppThemeProvider,
  AppToastContainer,
  useDarkMode,
  useDocumentTitle,
} from '@wisemen/vue-core'
import { RouterView } from 'vue-router'

import AppPageLoader from '@/components/app/loader/AppPageLoader.vue'
import { useRefreshPrompt } from '@/composables/refresh-prompt/refreshPrompt.composable'
import { logBuildInformation } from '@/constants/environment.constant.ts'

const { setTemplate } = useDocumentTitle()
const darkMode = useDarkMode()

setTemplate('{title} | App')

useDarkMode()
useRefreshPrompt()
logBuildInformation()
</script>

<template>
  <AppConfigProvider locale="en">
    <AppThemeProvider :theme="darkMode.isEnabled.value ? 'dark' : 'light'">
      <RouterView />
      <AppPageLoader />
      <AppDialogContainer />
      <AppToastContainer />
    </AppThemeProvider>
  </AppConfigProvider>
</template>
