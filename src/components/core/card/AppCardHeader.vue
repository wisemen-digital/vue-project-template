<script setup lang="ts">
import { twMerge } from '@/libs/twMerge.lib'

const props = defineProps<{
	/**
	 * The class to be applied to the card content.
	 */
	class?: string
}>()
</script>

<template>
	<div :class="twMerge('flex flex-col p-4', props.class)">
		<slot />
	</div>
</template>
