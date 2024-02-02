<script setup lang="ts">
import AppPageLoader from '@/components/core/loader/AppPageLoader.vue'
import AppModalsContainer from '@/components/core/modal/AppModalsContainer.vue'
import AppToastsContainer from '@/components/core/toast/AppToastContainer.vue'

import { useDocumentTitle } from './composables/core/documentTitle.composable'

const { setTemplate } = useDocumentTitle()

setTemplate('{title} | App')
</script>

<template>
	<div class="h-full w-full">
		<RouterView />
		<AppPageLoader />
		<AppModalsContainer />
		<AppToastsContainer />
	</div>
</template>
