<script setup lang="ts">
import { TabGroup } from '@headlessui/vue'

defineSlots<{
	/**
	 * Slot inside of TabGroup, should contain all Tab logic.
	 */
	default: void
}>()
</script>

<template>
	<TabGroup>
		<slot />
	</TabGroup>
</template>
