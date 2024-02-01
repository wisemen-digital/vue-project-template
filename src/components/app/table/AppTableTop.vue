<script setup lang="ts">
import AppText from '@/components/core/AppText.vue'

import AppBadge from '../AppBadge.vue'

interface Props {
	title: string
	total: number
}

const { title, total } = defineProps<Props>()
</script>

<template>
	<div class="p-6">
		<div class="flex items-center gap-x-2">
			<AppText
				class="font-medium"
				variant="subtitle"
			>
				{{ title }}
			</AppText>

			<AppBadge class="mt-0.5"> {{ total }} items </AppBadge>
		</div>
	</div>
</template>
