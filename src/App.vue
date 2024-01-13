<script setup lang="ts">
import { useDocumentTitle } from '@/composables/core'

const { setTemplate } = useDocumentTitle()

setTemplate('{title} | App')
</script>

<template>
  <RouterView />
  <AppPageLoader />
  <AppModalsContainer />
  <AppToastsContainer />
</template>
