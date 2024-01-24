<script setup lang="ts">
import AppPageLoader from '@/components/core/AppPageLoader.vue'
import AppModalsContainer from '@/ui/components/modal/AppModalsContainer.vue'
import AppToastsContainer from '@/ui/components/toast-v2/AppToastsContainer.vue'

import { useDocumentTitle } from './composables/core/documentTitle.composable'

const { setTemplate } = useDocumentTitle()

setTemplate('{title} | App')
</script>

<template>
	<RouterView />
	<AppPageLoader />
	<AppModalsContainer />
	<AppToastsContainer />
</template>
