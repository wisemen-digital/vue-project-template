<script setup lang="ts">
import AppIcon from '@/components/app/icon/AppIcon.vue'
import AppText from '@/components/app/text/AppText.vue'

const props = defineProps<{
	title: string
	description: string
}>()
</script>

<template>
	<div class="flex w-full flex-col items-center justify-center pb-24">
		<AppIcon
			class="h-20 w-40"
			icon="logo"
		/>

		<AppText
			class="text-center font-medium text-foreground"
			variant="title"
		>
			{{ props.title }}
		</AppText>

		<AppText
			class="mt-2 text-center text-gray-500"
			variant="subtext"
		>
			{{ props.description }}
		</AppText>

		<div class="mt-6 w-full">
			<slot />
		</div>
	</div>
</template>
