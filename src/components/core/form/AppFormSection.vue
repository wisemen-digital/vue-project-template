<script setup lang="ts">
import AppText from '@/components/core/text/AppText.vue'

type Props = {
	title: string
}

const { title } = defineProps<Props>()
</script>

<template>
	<div class="mb-4 flex flex-col gap-4">
		<div class="border-b border-solid border-muted pb-2">
			<div class="flex items-center justify-between">
				<AppText
					class="mr-auto font-medium"
					variant="heading"
				>
					{{ title }}
				</AppText>
				<div class="flex items-center justify-between gap-2">
					<slot name="actions" />
				</div>
			</div>
		</div>
		<slot />
	</div>
</template>
