<script setup lang="ts">
import {
  AppDialogContainer,
  AppToastContainer,
  useDocumentTitle,
} from '@wisemen/vue-core'
import { RouterView } from 'vue-router'

import AppPageLoader from '@/components/app/loader/AppPageLoader.vue'
import { useRefreshPrompt } from '@/composables/refresh-prompt/refreshPrompt.composable'
import { logBuildInformation } from '@/constants/environment.constant.ts'

const { setTemplate } = useDocumentTitle()

setTemplate('{title} | App')

useRefreshPrompt()
logBuildInformation()
</script>

<template>
  <RouterView />
  <AppPageLoader />
  <AppDialogContainer />
  <AppToastContainer />
</template>
