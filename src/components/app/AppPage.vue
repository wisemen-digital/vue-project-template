<script setup lang="ts">
import AppContainer from '@/components/app/AppContainer.vue'
import AppText from '@/components/core/AppText.vue'

const { title } = defineProps<{
	title: string
}>()
</script>

<template>
	<div class="flex w-full flex-1 flex-col">
		<AppContainer class="py-8">
			<AppText variant="title">
				{{ title }}
			</AppText>
		</AppContainer>

		<AppContainer class="flex flex-1 flex-col pb-8 pt-6">
			<slot />
		</AppContainer>
	</div>
</template>
