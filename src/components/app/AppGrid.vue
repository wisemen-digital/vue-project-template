<script setup lang="ts">
import { cn } from '@/utils/style.util.ts'

const { cols } = defineProps<{
	cols: 1 | 2 | 3 | 4
}>()
</script>

<template>
	<div
		class="grid gap-4"
		:class="
			cn({
				'grid-cols-1': cols === 1,
				'grid-cols-2': cols === 2,
				'grid-cols-3': cols === 3,
				'grid-cols-4': cols === 4,
			})
		"
	>
		<slot />
	</div>
</template>
