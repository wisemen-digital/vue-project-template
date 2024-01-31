<script setup lang="ts">
import AppText from '@/components/core/AppText.vue'

const { title, description } = defineProps<{
	title: string
	description: string
}>()
</script>

<template>
	<div>
		<AppText
			class="font-medium text-foreground"
			variant="title"
		>
			{{ title }}
		</AppText>

		<AppText
			class="mt-1"
			variant="body"
		>
			{{ description }}
		</AppText>

		<div class="mt-6">
			<slot />
		</div>
	</div>
</template>
