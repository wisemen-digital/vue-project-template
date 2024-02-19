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
	<div :class="twMerge('flex flex-col p-4', classes)">
		<slot />
	</div>
</template>
