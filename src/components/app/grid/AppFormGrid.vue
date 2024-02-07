<script setup lang="ts">
import { cn } from '@/utils/style.util.ts'

const { cols } = defineProps<{
	cols: 1 | 2 | 3 | 4 | 5
}>()
</script>

<template>
	<div
		class="grid gap-4"
		:class="
			cn({
				'grid-cols-1': cols === 1,
				'md:grid-cols-2': cols >= 2,
				'lg:grid-cols-3': cols >= 3,
				'xl:grid-cols-4': cols >= 4,
				'2xl:grid-cols-5': cols >= 5,
			})
		"
	>
		<slot />
	</div>
</template>
