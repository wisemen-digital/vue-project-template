<script setup lang="ts">
import AppIcon from '@/components/core/icon/AppIcon.vue'
import AppText from '@/components/core/text/AppText.vue'

const { title, description } = defineProps<{
	title: string
	description: string
}>()
</script>

<template>
	<div class="flex w-full flex-col items-center justify-center pb-24">
		<AppIcon
			class="mb-8"
			icon="logo"
			size="xl"
		/>

		<AppText
			class="font-medium text-foreground"
			variant="title"
		>
			{{ title }}
		</AppText>

		<AppText
			class="mt-1 text-gray-500"
			variant="body"
		>
			{{ description }}
		</AppText>

		<div class="mt-6 w-full">
			<slot />
		</div>
	</div>
</template>
