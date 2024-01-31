<script setup lang="ts">
import { TabList } from '@headlessui/vue'

defineSlots<{
	/**
	 * Slot inside of TabList, should contain Tab elements.
	 */
	default: void
}>()
</script>

<template>
	<TabList class="flex w-full flex-wrap justify-stretch">
		<slot />
	</TabList>
</template>
