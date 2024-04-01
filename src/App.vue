<script setup lang="ts">
import {
  AppDialogContainer,
  AppToastContainer,
} from '@wisemen/vue-core'
import { RouterView } from 'vue-router'

import AppPageLoader from '@/components/app/loader/AppPageLoader.vue'
import ThemeProvider from '@/components/app/ThemeProvider.vue'

import { useDocumentTitle } from './composables/document-title/documentTitle.composable'
import { useRefreshPrompt } from './composables/refresh-prompt/refreshPrompt.composable'

const { setTemplate } = useDocumentTitle()

useRefreshPrompt()

setTemplate('{title} | App')
</script>

<template>
  <ThemeProvider>
    <RouterView />
    <AppPageLoader />
    <AppDialogContainer />
    <AppToastContainer />
  </ThemeProvider>
</template>
