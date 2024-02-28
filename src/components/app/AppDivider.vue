<script setup lang="ts">
import { cn } from '@/utils/style.util.ts'

const props = defineProps<{
	direction: 'horizontal' | 'vertical'
}>()
</script>

<template>
	<div
		class="bg-muted"
		:class="
			cn(
				{
					'h-full w-[1px]': props.direction === 'vertical',
				},
				{ 'h-[1px] w-full': props.direction === 'horizontal' }
			)
		"
	/>
</template>
