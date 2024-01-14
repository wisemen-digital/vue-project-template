<script setup lang="ts">
import AppPageLoader from '@/components/core/AppPageLoader.vue'
import { useDocumentTitle } from '@/composables/core/useDocumentTitle.ts'
import AppModalsContainer from '@/ui/components/modal/AppModalsContainer.vue'
import AppToastsContainer from '@/ui/components/toasts/AppToastsContainer.vue'

const { setTemplate } = useDocumentTitle()

setTemplate('{title} | App')
</script>

<template>
	<RouterView />
	<AppPageLoader />
	<AppModalsContainer />
	<AppToastsContainer />
</template>
