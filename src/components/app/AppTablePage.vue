<script setup lang="ts">
import AppPage from './AppPage.vue'

const props = withDefaults(
	defineProps<{
		title: string
		subtitle?: string | null
	}>(),
	{
		subtitle: null,
	}
)
</script>

<template>
	<AppPage
		class="h-screen overflow-hidden"
		:subtitle="props.subtitle"
		:title="props.title"
	>
		<template #header-actions>
			<slot name="header-actions" />
		</template>

		<slot />
	</AppPage>
</template>
