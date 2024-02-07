<script setup lang="ts">
import { twMerge } from '@/libs/twMerge.lib'

const { class: classes } = defineProps<{
	/**
	 * The class to be applied to the card content.
	 */
	class?: string
}>()
</script>

<template>
	<div :class="twMerge('flex flex-col gap-1 p-4 pt-0', classes)">
		<slot />
	</div>
</template>
