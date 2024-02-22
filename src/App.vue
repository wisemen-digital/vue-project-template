<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterView } from 'vue-router'

import AppPageLoader from '@/components/app/loader/AppPageLoader.vue'
import AppModalsContainer from '@/components/app/modal/AppModalsContainer.vue'

import AppToastContainer from './components/app/toast/AppToastContainer.vue'
import { useDocumentTitle } from './composables/document-title/documentTitle.composable'

const { setTemplate } = useDocumentTitle()

setTemplate('{title} | App')
</script>

<template>
	<RouterView />
	<VueQueryDevtools />
	<AppPageLoader />
	<AppModalsContainer />
	<AppToastContainer />
</template>
