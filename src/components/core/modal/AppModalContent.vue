<script setup lang="ts">
import { twMerge } from '@/utils/core//tailwind/twMerge'

const props = defineProps<{
	/**
	 * The class to be applied to the modal content.
	 */
	class?: string
}>()
</script>

<template>
	<div :class="twMerge('flex flex-col gap-1 p-4 pt-0', props.class)">
		<slot />
	</div>
</template>
