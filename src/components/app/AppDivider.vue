<script setup lang="ts">
import { cn } from '@/utils/style.util.ts'

const { direction } = defineProps<{
	direction: 'horizontal' | 'vertical'
}>()
</script>

<template>
	<div
		class="bg-muted"
		:class="cn({ 'h-full w-[1px]': direction === 'vertical' }, { 'h-[1px] w-full': direction === 'horizontal' })"
	/>
</template>
