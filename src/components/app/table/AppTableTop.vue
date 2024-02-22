<script setup lang="ts">
import { toLocaleNumber } from '@/utils/number.util'

import AppBadge from '../AppBadge.vue'
import AppText from '../text/AppText.vue'

const props = defineProps<{
	title: string
	total: number
}>()
</script>

<template>
	<div class="px-6 py-4">
		<div class="flex items-center gap-x-2">
			<AppText
				class="font-medium"
				variant="subtitle"
			>
				{{ props.title }}
			</AppText>

			<AppBadge class="mt-0.5"> {{ toLocaleNumber(props.total) }} items </AppBadge>
		</div>
	</div>
</template>
