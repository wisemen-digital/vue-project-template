<script setup lang="ts">
import { cn } from '@/utils/style.util.ts'

type Props = {
	direction: 'horizontal' | 'vertical'
}

defineProps<Props>()
</script>

<template>
	<div
		class="bg-muted"
		:class="cn({ 'h-full w-[1px]': direction === 'vertical' }, { 'h-[1px] w-full': direction === 'horizontal' })"
	/>
</template>
