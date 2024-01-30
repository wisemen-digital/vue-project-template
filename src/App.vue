<script setup lang="ts">
// import AppPageLoader from '@/components/core/AppPageLoader.vue'
// import AppModalsContainer from '@/ui/components/modal/AppModalsContainer.vue'
// import AppToastsContainer from '@/ui/components/toast-v2/AppToastsContainer.vue'

import AppTableExample from './AppTableExample.vue'
import { useDocumentTitle } from './composables/core/documentTitle.composable'

const { setTemplate } = useDocumentTitle()

setTemplate('{title} | App')
</script>

<template>
	<!-- <RouterView /> -->
	<!-- <AppPageLoader /> -->
	<!-- <AppModalsContainer /> -->
	<!-- <AppToastsContainer /> -->
	<div class="flex h-screen w-full flex-col overflow-hidden">
		<!-- <AppContainer class="flex flex-col overflow-hidden py-16"> -->
		<div class="overflow-hidden p-16">
			<AppTableExample />
		</div>
		<!-- </AppContainer> -->
	</div>
</template>
